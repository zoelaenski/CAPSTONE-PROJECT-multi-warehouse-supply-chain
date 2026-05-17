const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse.controller');


const {protect} = require('../middlewares/auth.middleware');
const {authorise} = require('../middlewares/role.middleware');
// for ZOE - const {authenticate, authorizeRole} = require('../middleware/auth.middleware');

// Create a new warehouse (admin only)
// for ZOE - router.post('/', authenticate, authorizeRole('admin'), warehouseController.createWarehouse);
/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post ('/', protect, authorise('Admin'), warehouseController.createWarehouse);

// Get all warehouses (admin only)
// for ZOE (might not be needed) - router.get('/', authenticate, authorizeRole('admin'), warehouseController.getAllWarehouses);
/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Get all warehouses
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of warehouses
 *       401:
 *         description: Unauthorized
 */
router.get ('/', protect, warehouseController.getAllWarehouses);

// Get a warehouse by ID (admin only)
// for ZOE (might not be needed) - router.get('/:id', authenticate, authorizeRole('admin'), warehouseController.getWarehouseById);
/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Get warehouse by ID
 *     tags: [Warehouses]
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
 *         description: Warehouse retrieved successfully
 *       404:
 *         description: Warehouse not found
 */
router.get ('/:id', protect, warehouseController.getWarehouseById);

// Update a warehouse (admin only)
// for ZOE (might not be needed) - router.put('/:id', authenticate, authorizeRole('admin'), warehouseController.updateWarehouse);
/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Update warehouse details
 *     tags: [Warehouses]
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
 *         description: Warehouse updated successfully
 *       403:
 *         description: Admin access required
 */
router.put ('/:id', protect, authorise('Admin'), warehouseController.updateWarehouse);

// Delete a warehouse (admin only)
// for ZOE (might not be needed) - router.delete('/:id', authenticate, authorizeRole('admin'), warehouseController.deactivateWarehouse);
/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Deactivate a warehouse
 *     tags: [Warehouses]
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
 *         description: Warehouse deactivated successfully
 *       403:
 *         description: Admin access required
 */
router.delete ('/:id', protect, authorise('Admin'), warehouseController.deactivateWarehouse);



module.exports = router;