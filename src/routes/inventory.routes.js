const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/inventory/low-stock:
 *   get:
 *     summary: Get low stock inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low stock items retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get('/low-stock', protect, authorise('Admin', 'Staff'), inventoryController.getLowStockItems);
/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               warehouse:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, authorise('Admin', 'Staff'), inventoryController.createInventory);
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, inventoryController.getAllInventory);
/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get inventory item by ID
 *     tags: [Inventory]
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
 *         description: Inventory item retrieved successfully
 *       404:
 *         description: Inventory item not found
 */
router.get('/:id', protect, inventoryController.getInventoryById);
/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Inventory item not found
 */
router.put('/:id', protect, authorise('Admin', 'Staff'), inventoryController.updateInventory);
/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete inventory item
 *     tags: [Inventory]
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
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory item not found
 */
router.delete('/:id', protect, authorise('Admin'), inventoryController.deleteInventory);

module.exports = router;