const Inventory = require('../models/inventory.model');
const PurchaseOrder = require('../models/purchaseOrder.model');
const Transfer = require('../models/transfer.model');

const getInventorySummary = async () => {
  return await Inventory.aggregate([
    {
      $group: {
        _id: '$warehouse',
        totalProducts: { $sum: 1 },
        totalStockValue: { $sum: { $multiply: ['$quantityInStock', '$reorderLevel'] } },
        totalQuantity: { $sum: '$quantityInStock' },
      },
    },
    {
      $lookup: {
        from: 'warehouses',
        localField: '_id',
        foreignField: '_id',
        as: 'warehouse',
      },
    },
    { $unwind: '$warehouse' },
    {
      $project: {
        warehouseName: '$warehouse.name',
        warehouseLocation: '$warehouse.location',
        totalProducts: 1,
        totalQuantity: 1,
        totalStockValue: 1,
      },
    },
  ]);
};

const getLowStockReport = async () => {
  return await Inventory.find({
    $expr: { $lte: ['$quantityInStock', '$reorderLevel'] },
  })
    .populate('product', 'name SKU unitPrice')
    .populate('warehouse', 'name location');
};

const getPurchaseOrderSummary = async () => {
  return await PurchaseOrder.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: '$totalAmount' },
      },
    },
  ]);
};

const getTransferSummary = async () => {
  return await Transfer.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
};

const getSupplierPerformance = async () => {
  return await PurchaseOrder.aggregate([
    {
      $group: {
        _id: '$supplier',
        totalOrders: { $sum: 1 },
        totalValue: { $sum: '$totalAmount' },
        receivedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'received'] }, 1, 0] },
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: '_id',
        foreignField: '_id',
        as: 'supplier',
      },
    },
    { $unwind: '$supplier' },
    {
      $project: {
        supplierName: '$supplier.name',
        supplierEmail: '$supplier.email',
        totalOrders: 1,
        totalValue: 1,
        receivedOrders: 1,
        cancelledOrders: 1,
      },
    },
  ]);
};

module.exports = {
  getInventorySummary,
  getLowStockReport,
  getPurchaseOrderSummary,
  getTransferSummary,
  getSupplierPerformance,
};