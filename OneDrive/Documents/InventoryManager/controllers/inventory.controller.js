const inventoryService = require('../services/inventory.service');

// create inventory
exports.createInventory = async (req, res, next) => {
  try {
    const newInventory = await inventoryService.createInventory(req.body);
    return res.status(201).json({ success: true, data: newInventory });
  } catch (error) {
    return next(error);
  }
};

// get all inventory items
exports.getAllInventory = async (req, res, next) => {
  try {
    const inventoryList = await inventoryService.getAllInventory();
    return res.json({ success: true, data: inventoryList });
  } catch (error) {
    return next(error);
  }
};

// get inventory by id
exports.getInventoryById = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getInventoryById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ success: false, data: null, error: 'Inventory not found' });
    }
    return res.json({ success: true, data: inventory });
  } catch (error) {
    return next(error);
  }
};

// update inventory by id
exports.updateInventoryById = async (req, res, next) => {
  try {
    const updatedInventory = await inventoryService.updateInventoryById(req.params.id, req.body);
    if (!updatedInventory) {
      return res.status(404).json({ success: false, data: null, error: 'Inventory not found' });
    }
    return res.json({ success: true, data: updatedInventory });
  } catch (error) {
    return next(error);
  }
};

// delete inventory by id
exports.deleteInventoryById = async (req, res, next) => {
  try {
    const deleted = await inventoryService.deleteInventoryById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, data: null, error: 'Inventory not found' });
    }
    return res.json({ success: true, data: { message: 'Inventory deleted successfully' } });
  } catch (error) {
    return next(error);
  }
};

// get low stock items
exports.getLowStockItems = async (req, res, next) => {
  try {
    const lowStockItems = await inventoryService.getLowStockItems();
    return res.json({ success: true, data: lowStockItems });
  } catch (error) {
    return next(error);
  }
};
