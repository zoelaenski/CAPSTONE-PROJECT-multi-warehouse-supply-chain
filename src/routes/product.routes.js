const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

router.post('/', protect, authorise('Admin'), productController.createProduct);
router.get('/', protect, productController.getAllProducts);
router.get('/:id', protect, productController.getProductById);
router.put('/:id', protect, authorise('Admin'), productController.updateProduct);
router.delete('/:id', protect, authorise('Admin'), productController.deleteProduct);

module.exports = router;