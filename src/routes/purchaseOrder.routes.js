const express = require('express');
const router = express.Router();

const {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrder,
    confirmPurchaseOrder,
    shipPurchaseOrder,
    receivePurchaseOrder,
    cancelPurchaseOrder
} = require('../controllers/purchaseOrderController');

const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware')

// All routes below require authentication
router.use(protect);

// Standard CRUD
/**
 * @swagger
 * /api/purchase-orders:
 *   get:
 *     summary: Get all purchase orders
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of purchase orders
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new purchase order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 type: string
 *               items:
 *                 type: array
 *               warehouse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Purchase order created successfully
 *       401:
 *         description: Unauthorized
 */
router
    .route('/')
    .get(authorise('Admin', 'Staff'), getAllPurchaseOrders)
    .post(authorise('Admin', 'Staff'), createPurchaseOrder);

    /**
 * @swagger
 * /api/purchase-orders/{id}:
 *   get:
 *     summary: Get a purchase order by ID
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order retrieved successfully
 *       404:
 *         description: Purchase order not found
 */
router
    .route('/:id')
    .get(authorise('Admin', 'Staff'), getPurchaseOrder);

// Status transitions
/**
 * @swagger
 * /api/purchase-orders/{id}/confirm:
 *   put:
 *     summary: Confirm a purchase order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order confirmed successfully
 */
router.put('/:id/confirm', authorise('Admin', 'Staff'), confirmPurchaseOrder);
/**
 * @swagger
 * /api/purchase-orders/{id}/ship:
 *   put:
 *     summary: Mark purchase order as shipped
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order shipped successfully
 */
router.put('/:id/ship', authorise('Admin', 'Staff'), shipPurchaseOrder);
/**
 * @swagger
 * /api/purchase-orders/{id}/receive:
 *   put:
 *     summary: Receive a purchase order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order received successfully
 */
router.put('/:id/receive', authorise('Admin', 'Staff'), receivePurchaseOrder);
/**
 * @swagger
 * /api/purchase-orders/{id}/cancel:
 *   put:
 *     summary: Cancel a purchase order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order cancelled successfully
 */
router.put('/:id/cancel', authorise('Admin', 'Staff'), cancelPurchaseOrder);


module.exports = router;