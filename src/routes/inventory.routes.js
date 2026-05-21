const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

router.get('/low-stock', protect, authorise('Admin', 'Staff'), inventoryController.getLowStockItems);
router.post('/', protect, authorise('Admin', 'Staff'), inventoryController.createInventory);
router.get('/', protect, inventoryController.getAllInventory);
router.get('/:id', protect, inventoryController.getInventoryById);
router.put('/:id', protect, authorise('Admin', 'Staff'), inventoryController.updateInventory);
router.delete('/:id', protect, authorise('Admin'), inventoryController.deleteInventory);

module.exports = router;