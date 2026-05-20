const reportService = require('../services/report.service');

const getInventorySummary = async (req, res, next) => {
  try {
    const data = await reportService.getInventorySummary();
    res.status(200).json({
      success: true,
      message: 'Inventory summary retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getLowStockReport = async (req, res, next) => {
  try {
    const data = await reportService.getLowStockReport();
    res.status(200).json({
      success: true,
      message: 'Low stock report retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPurchaseOrderSummary = async (req, res, next) => {
  try {
    const data = await reportService.getPurchaseOrderSummary();
    res.status(200).json({
      success: true,
      message: 'Purchase order summary retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getTransferSummary = async (req, res, next) => {
  try {
    const data = await reportService.getTransferSummary();
    res.status(200).json({
      success: true,
      message: 'Transfer summary retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getSupplierPerformance = async (req, res, next) => {
  try {
    const data = await reportService.getSupplierPerformance();
    res.status(200).json({
      success: true,
      message: 'Supplier performance report retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventorySummary,
  getLowStockReport,
  getPurchaseOrderSummary,
  getTransferSummary,
  getSupplierPerformance,
};