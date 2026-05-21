const inventoryService = require('../services/inventory.service');

const createInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.createInventory(req.body);
    res.status(201).json({
      success: true,
      message: 'Inventory record created successfully',
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

const getAllInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getAllInventory(req.query);
    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

const getInventoryById = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getInventoryById(req.params.id);
    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

const updateInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.updateInventory(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Inventory record updated successfully',
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.deleteInventory(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Inventory record deleted successfully',
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

const getLowStockItems = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getLowStockItems();
    res.status(200).json({
      success: true,
      message: 'Low stock items retrieved successfully',
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getLowStockItems,
};