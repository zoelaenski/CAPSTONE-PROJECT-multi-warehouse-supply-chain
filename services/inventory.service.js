const inventoryModel = require('../models/inventory.model');

// Create a new inventory record
exports.createInventory = async function createInventory(data) {
  const inventory = new inventoryModel(data);
  return await inventory.save();
};

// Get all inventory
exports.getAllInventory = async function getAllInventory() {
  return await inventoryModel.find().populate('warehouse').populate('product');
};

// Get inventory by ID
exports.getInventoryById = async function getInventoryById(id) {
  return await inventoryModel.findById(id).populate('warehouse').populate('product');
};

// Update inventory by ID
exports.updateInventoryById = async function updateInventoryById(id, data) {
  return await inventoryModel
    .findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('warehouse')
    .populate('product');
};

// Delete inventory by ID
exports.deleteInventoryById = async function deleteInventoryById(id) {
  return await inventoryModel.findByIdAndDelete(id);
};

// Get low stock inventory items
exports.getLowStockItems = async function getLowStockItems() {
  return await inventoryModel
    .find({
      $expr: { $lte: ['$quantityInStock', '$reorderLevel'] },
    })
    .populate('warehouse')
    .populate('product');
};
