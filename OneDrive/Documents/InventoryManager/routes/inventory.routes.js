const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');


const router = express.Router();

const protectAll = protect;

router.get('/low-stock', protectAll, authorize('Admin', 'Staff'), inventoryController.getLowStockItems);

router.post('/', protectAll, authorize('Admin', 'Staff'), inventoryController.createInventory);
router.get('/', protectAll, inventoryController.getAllInventory);
router.get('/:id', protectAll, inventoryController.getInventoryById);
router.put('/:id', protectAll, authorize('Admin', 'Staff'), inventoryController.updateInventoryById);
router.delete('/:id', protectAll, authorize('Admin'), inventoryController.deleteInventoryById);

module.exports = router;


