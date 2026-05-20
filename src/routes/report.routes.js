const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

router.get('/inventory-summary', protect, authorise('Admin'), reportController.getInventorySummary);
router.get('/low-stock', protect, authorise('Admin', 'Staff'), reportController.getLowStockReport);
router.get('/purchase-orders', protect, authorise('Admin'), reportController.getPurchaseOrderSummary);
router.get('/transfers', protect, authorise('Admin'), reportController.getTransferSummary);
router.get('/supplier-performance', protect, authorise('Admin'), reportController.getSupplierPerformance);

module.exports = router;