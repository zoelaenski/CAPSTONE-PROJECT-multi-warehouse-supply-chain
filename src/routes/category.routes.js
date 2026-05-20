const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorise } = require('../middlewares/role.middleware');

router.post('/', protect, authorise('Admin'), categoryController.createCategory);
router.get('/', protect, categoryController.getAllCategories);
router.get('/:id', protect, categoryController.getCategoryById);
router.put('/:id', protect, authorise('Admin'), categoryController.updateCategory);
router.delete('/:id', protect, authorise('Admin'), categoryController.deleteCategory);

module.exports = router;