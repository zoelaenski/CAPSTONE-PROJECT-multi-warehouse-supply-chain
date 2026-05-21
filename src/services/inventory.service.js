const Inventory = require('../models/inventory.model');

const createInventory = async (data) => {
  return await Inventory.create(data);
};

const getAllInventory = async (query) => {
  const filter = {};
  if (query.warehouse) filter.warehouse = query.warehouse;
  if (query.product) filter.product = query.product;

  return await Inventory.find(filter)
    .populate('warehouse', 'name location')
    .populate('product', 'name SKU unitPrice');
};

const getInventoryById = async (id) => {
  const inventory = await Inventory.findById(id)
    .populate('warehouse', 'name location')
    .populate('product', 'name SKU unitPrice');
  if (!inventory) {
    const error = new Error('Inventory record not found');
    error.statusCode = 404;
    throw error;
  }
  return inventory;
};

const updateInventory = async (id, data) => {
  const inventory = await Inventory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate('warehouse', 'name location')
    .populate('product', 'name SKU unitPrice');
  if (!inventory) {
    const error = new Error('Inventory record not found');
    error.statusCode = 404;
    throw error;
  }
  if (data.quantityInStock !== undefined) {
    inventory.lastRestocked = new Date();
    await inventory.save();
  }
  return inventory;
};

const deleteInventory = async (id) => {
  const inventory = await Inventory.findByIdAndDelete(id);
  if (!inventory) {
    const error = new Error('Inventory record not found');
    error.statusCode = 404;
    throw error;
  }
  return inventory;
};

const getLowStockItems = async () => {
  return await Inventory.find({
    $expr: { $lte: ['$quantityInStock', '$reorderLevel'] },
  })
    .populate('warehouse', 'name location')
    .populate('product', 'name SKU unitPrice');
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getLowStockItems,
};