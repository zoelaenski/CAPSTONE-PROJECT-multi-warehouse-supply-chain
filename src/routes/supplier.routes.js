const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorise } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, authorise("Admin"), supplierController.createSupplier);

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suppliers retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, supplierController.getALLSuppliers);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
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
 *         description: Supplier retrieved successfully
 *       404:
 *         description: Supplier not found
 */
router.get("/:id", protect, supplierController.getSupplierById);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update supplier details
 *     tags: [Suppliers]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 */
router.put("/:id", protect, authorise("Admin"), supplierController.updateSupplier);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Deactivate supplier
 *     tags: [Suppliers]
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
 *         description: Supplier deactivated successfully
 *       404:
 *         description: Supplier not found
 */
router.delete("/:id", protect, authorise("Admin"), supplierController.deactivateSupplier);

/**
 * @swagger
 * /api/suppliers/{id}/products:
 *   post:
 *     summary: Link product to supplier
 *     tags: [Suppliers]
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
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product linked successfully
 *       404:
 *         description: Supplier or product not found
 */
router.post("/:id/products", protect, authorise("Admin"), supplierController.linkProduct);

/**
 * @swagger
 * /api/suppliers/{id}/products/{productId}:
 *   delete:
 *     summary: Unlink product from supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product unlinked successfully
 *       404:
 *         description: Supplier or product not found
 */
router.delete("/:id/products/:productId", protect, authorise("Admin"), supplierController.unlinkProduct);

module.exports = router;