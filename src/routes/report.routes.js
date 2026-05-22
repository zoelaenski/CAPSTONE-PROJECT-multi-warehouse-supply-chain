const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/reports/inventory-summary:
 *   get:
 *     summary: Get inventory summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory summary retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get('/inventory-summary', protect, authorise('Admin'), reportController.getInventorySummary);
/**
 * @swagger
 * /api/reports/low-stock:
 *   get:
 *     summary: Get low stock report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low stock report retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin/Staff only)
 */
router.get('/low-stock', protect, authorise('Admin', 'Staff'), reportController.getLowStockReport);
/**
 * @swagger
 * /api/reports/purchase-orders:
 *   get:
 *     summary: Get purchase order summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchase order report retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get('/purchase-orders', protect, authorise('Admin'), reportController.getPurchaseOrderSummary);
/**
 * @swagger
 * /api/reports/transfers:
 *   get:
 *     summary: Get warehouse transfer report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transfer report retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get('/transfers', protect, authorise('Admin'), reportController.getTransferSummary);
/**
 * @swagger
 * /api/reports/supplier-performance:
 *   get:
 *     summary: Get supplier performance report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Supplier performance report retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get('/supplier-performance', protect, authorise('Admin'), reportController.getSupplierPerformance);

module.exports = router;