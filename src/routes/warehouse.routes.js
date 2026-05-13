const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse.controller');


const {protect} = require('../middleware/auth.middleware');
const {authorize} = require('../middleware/auth.middleware');
// for ZOE - const {authenticate, authorizeRole} = require('../middleware/auth.middleware');

// Create a new warehouse (admin only)
// for ZOE - router.post('/', authenticate, authorizeRole('admin'), warehouseController.createWarehouse);
router.post ('/', protect, authorize('Admin'), warehouseController.createWarehouse);

// Get all warehouses (admin only)
// for ZOE (might not be needed) - router.get('/', authenticate, authorizeRole('admin'), warehouseController.getAllWarehouses);
router.get ('/', protect, warehouseController.getAllWarehouses);

// Get a warehouse by ID (admin only)
// for ZOE (might not be needed) - router.get('/:id', authenticate, authorizeRole('admin'), warehouseController.getWarehouseById);
router.get ('/:id', protect, warehouseController.getWarehouseById);

// Update a warehouse (admin only)
// for ZOE (might not be needed) - router.put('/:id', authenticate, authorizeRole('admin'), warehouseController.updateWarehouse);
router.put ('/:id', protect, authorize('Admin'), warehouseController.updateWarehouse);

// Delete a warehouse (admin only)
// for ZOE (might not be needed) - router.delete('/:id', authenticate, authorizeRole('admin'), warehouseController.deactivateWarehouse);
router.delete ('/:id', protect, authorize('Admin'), warehouseController.deactivateWarehouse);



module.exports = router;