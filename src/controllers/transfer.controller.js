const transferService = require("../services/transfer.service");

// ── Utility ───────────────────────────────────────────────────────────────────

/**
 * Wraps an async route handler and forwards any thrown error to Express's
 * next() so the central error handler picks it up.
 */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * POST /transfers
 * Create a new transfer request.
 * Body: { fromWarehouse, toWarehouse, items: [{ product, quantity }], notes? }
 */
const requestTransfer = asyncHandler(async (req, res) => {
  const { fromWarehouse, toWarehouse, items, notes } = req.body;

  if (!fromWarehouse || !toWarehouse || !items) {
    return res.status(400).json({
      success: false,
      message: "fromWarehouse, toWarehouse, and items are required",
    });
  }

  const transfer = await transferService.requestTransfer({
    fromWarehouse,
    toWarehouse,
    items,
    requestedBy: req.user.id,  // injected by auth middleware
    notes,
  });

  res.status(201).json({
    success: true,
    message: "Transfer request created successfully",
    data: transfer,
  });
});

/**
 * GET /transfers
 * List all transfers. Optional query params: status, fromWarehouse, toWarehouse
 */
const getAllTransfers = asyncHandler(async (req, res) => {
  const { status, fromWarehouse, toWarehouse } = req.query;
  const transfers = await transferService.getAllTransfers({ status, fromWarehouse, toWarehouse });

  res.status(200).json({
    success: true,
    count: transfers.length,
    data: transfers,
  });
});

/**
 * GET /transfers/:id
 * Get a single transfer by its ID.
 */
const getTransferById = asyncHandler(async (req, res) => {
  const transfer = await transferService.getTransferById(req.params.id);

  res.status(200).json({
    success: true,
    data: transfer,
  });
});

/**
 * PUT /transfers/:id/approve
 * Approve a pending transfer. Admin only.
 */
const approveTransfer = asyncHandler(async (req, res) => {
  const transfer = await transferService.approveTransfer(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Transfer approved successfully",
    data: transfer,
  });
});

/**
 * PUT /transfers/:id/complete
 * Mark an approved transfer as completed.
 * Deducts stock from source and adds to destination warehouse.
 */
const completeTransfer = asyncHandler(async (req, res) => {
  const transfer = await transferService.completeTransfer(req.params.id);

  res.status(200).json({
    success: true,
    message: "Transfer completed. Inventory has been updated.",
    data: transfer,
  });
});

/**
 * PUT /transfers/:id/cancel
 * Cancel a pending or approved transfer.
 * Body (optional): { cancelReason }
 */
const cancelTransfer = asyncHandler(async (req, res) => {
  const transfer = await transferService.cancelTransfer(req.params.id, req.body.cancelReason);

  res.status(200).json({
    success: true,
    message: "Transfer cancelled successfully",
    data: transfer,
  });
});

module.exports = {
  requestTransfer,
  getAllTransfers,
  getTransferById,
  approveTransfer,
  completeTransfer,
  cancelTransfer,
};