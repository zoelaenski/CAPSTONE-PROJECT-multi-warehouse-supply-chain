const Transfer = require("../models/transfer.model");

/**
 * Lazily resolve peer models so this service works regardless of
 * the order modules are loaded (avoids circular-require issues).
 */
const getModels = () => ({
  Warehouse: require("../models/warehouse.model"),
  Product: require("../models/product.model"),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Verify that a warehouse document exists and return it.
 * Throws a structured error if not found.
 */
const requireWarehouse = async (Warehouse, id, label) => {
  const wh = await Warehouse.findById(id);
  if (!wh) {
    const err = new Error(`${label} warehouse not found`);
    err.statusCode = 404;
    throw err;
  }
  return wh;
};

/**
 * Verify that every product in the items array exists.
 * Returns a Map<productId, productDoc> for later use.
 */
const validateProducts = async (Product, items) => {
  const productMap = new Map();
  for (const item of items) {
    if (productMap.has(item.product.toString())) continue; // already checked
    const product = await Product.findById(item.product);
    if (!product) {
      const err = new Error(`Product ${item.product} not found`);
      err.statusCode = 404;
      throw err;
    }
    productMap.set(item.product.toString(), product);
  }
  return productMap;
};

/**
 * Resolve the inventory entry for a product inside a warehouse's inventory
 * array (common pattern: Warehouse.inventory = [{ product, quantity }]).
 */
const findInventoryEntry = (warehouse, productId) =>
  (warehouse.inventory || []).find(
    (entry) => entry.product.toString() === productId.toString()
  );

// ── Service methods ───────────────────────────────────────────────────────────

/**
 * Create a new transfer request (status = pending).
 */
const requestTransfer = async ({ fromWarehouse, toWarehouse, items, requestedBy, notes }) => {
  const { Warehouse, Product } = getModels();

  // Existence checks
  await requireWarehouse(Warehouse, fromWarehouse, "Source");
  await requireWarehouse(Warehouse, toWarehouse, "Destination");
  await validateProducts(Product, items);

  const transfer = await Transfer.create({
    fromWarehouse,
    toWarehouse,
    items,
    requestedBy,
    notes,
  });

  return transfer.populate([
    { path: "fromWarehouse", select: "name location" },
    { path: "toWarehouse", select: "name location" },
    { path: "requestedBy", select: "name email" },
    { path: "items.product", select: "name sku" },
  ]);
};

/**
 * Return all transfers, newest first.
 * Supports optional query filters: status, fromWarehouse, toWarehouse.
 */
const getAllTransfers = async (filters = {}) => {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.fromWarehouse) query.fromWarehouse = filters.fromWarehouse;
  if (filters.toWarehouse) query.toWarehouse = filters.toWarehouse;

  return Transfer.find(query)
    .sort({ createdAt: -1 })
    .populate({ path: "fromWarehouse", select: "name location" })
    .populate({ path: "toWarehouse", select: "name location" })
    .populate({ path: "requestedBy", select: "name email" })
    .populate({ path: "approvedBy", select: "name email" })
    .populate({ path: "items.product", select: "name sku" });
};

/**
 * Return a single transfer by ID.
 */
const getTransferById = async (id) => {
  const transfer = await Transfer.findById(id)
    .populate({ path: "fromWarehouse", select: "name location" })
    .populate({ path: "toWarehouse", select: "name location" })
    .populate({ path: "requestedBy", select: "name email" })
    .populate({ path: "approvedBy", select: "name email" })
    .populate({ path: "items.product", select: "name sku" });

  if (!transfer) {
    const err = new Error("Transfer not found");
    err.statusCode = 404;
    throw err;
  }
  return transfer;
};

/**
 * Approve a pending transfer (Admin only).
 * Transitions: pending → approved
 */
const approveTransfer = async (id, adminUserId) => {
  const transfer = await Transfer.findById(id);
  if (!transfer) {
    const err = new Error("Transfer not found");
    err.statusCode = 404;
    throw err;
  }
  if (transfer.status !== "pending") {
    const err = new Error(`Only pending transfers can be approved. Current status: ${transfer.status}`);
    err.statusCode = 400;
    throw err;
  }

  transfer.status = "approved";
  transfer.approvedBy = adminUserId;
  await transfer.save();

  return transfer.populate([
    { path: "fromWarehouse", select: "name location" },
    { path: "toWarehouse", select: "name location" },
    { path: "requestedBy", select: "name email" },
    { path: "approvedBy", select: "name email" },
    { path: "items.product", select: "name sku" },
  ]);
};

/**
 * Complete a transfer:
 *  1. Validate source has enough stock for every item.
 *  2. Deduct from source warehouse inventory.
 *  3. Add to destination warehouse inventory.
 *  4. Mark transfer as completed.
 * Transitions: approved → completed
 */
const completeTransfer = async (id) => {
  const { Warehouse } = getModels();

  const transfer = await Transfer.findById(id);
  if (!transfer) {
    const err = new Error("Transfer not found");
    err.statusCode = 404;
    throw err;
  }
  if (transfer.status !== "approved") {
    const err = new Error(
      `Only approved transfers can be completed. Current status: ${transfer.status}`
    );
    err.statusCode = 400;
    throw err;
  }

  const sourceWarehouse = await requireWarehouse(Warehouse, transfer.fromWarehouse, "Source");
  const destWarehouse = await requireWarehouse(Warehouse, transfer.toWarehouse, "Destination");

  // ── Stock validation (fail fast before touching any inventory) ────────────
  for (const item of transfer.items) {
    const entry = findInventoryEntry(sourceWarehouse, item.product);
    const available = entry ? entry.quantity : 0;
    if (available < item.quantity) {
      const err = new Error(
        `Insufficient stock for product ${item.product}. ` +
        `Required: ${item.quantity}, Available: ${available}`
      );
      err.statusCode = 400;
      throw err;
    }
  }

  // ── Inventory mutation ────────────────────────────────────────────────────
  for (const item of transfer.items) {
    const productId = item.product.toString();

    // Deduct from source
    const srcEntry = findInventoryEntry(sourceWarehouse, productId);
    srcEntry.quantity -= item.quantity;

    // Add to destination (create entry if missing)
    const dstEntry = findInventoryEntry(destWarehouse, productId);
    if (dstEntry) {
      dstEntry.quantity += item.quantity;
    } else {
      destWarehouse.inventory.push({ product: item.product, quantity: item.quantity });
    }
  }

  // Save both warehouses and the transfer atomically-ish
  // (For true atomicity, wrap in a Mongoose session/transaction if your DB supports it)
  await sourceWarehouse.save();
  await destWarehouse.save();

  transfer.status = "completed";
  await transfer.save();

  return transfer.populate([
    { path: "fromWarehouse", select: "name location" },
    { path: "toWarehouse", select: "name location" },
    { path: "requestedBy", select: "name email" },
    { path: "approvedBy", select: "name email" },
    { path: "items.product", select: "name sku" },
  ]);
};

/**
 * Cancel a transfer (allowed while pending or approved).
 * Transitions: pending | approved → cancelled
 */
const cancelTransfer = async (id, cancelReason) => {
  const transfer = await Transfer.findById(id);
  if (!transfer) {
    const err = new Error("Transfer not found");
    err.statusCode = 404;
    throw err;
  }
  if (!["pending", "approved"].includes(transfer.status)) {
    const err = new Error(
      `Cannot cancel a transfer with status: ${transfer.status}. ` +
      "Only pending or approved transfers can be cancelled."
    );
    err.statusCode = 400;
    throw err;
  }

  transfer.status = "cancelled";
  if (cancelReason) transfer.cancelReason = cancelReason;
  await transfer.save();

  return transfer.populate([
    { path: "fromWarehouse", select: "name location" },
    { path: "toWarehouse", select: "name location" },
    { path: "requestedBy", select: "name email" },
    { path: "approvedBy", select: "name email" },
    { path: "items.product", select: "name sku" },
  ]);
};

module.exports = {
  requestTransfer,
  getAllTransfers,
  getTransferById,
  approveTransfer,
  completeTransfer,
  cancelTransfer,
};