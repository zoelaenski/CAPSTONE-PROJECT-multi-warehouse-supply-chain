const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorise } = require("../middlewares/role.middleware");

router.post("/", protect, authorise("Admin"), supplierController.createSupplier);
router.get("/", protect, supplierController.getALLSuppliers);
router.get("/:id", protect, supplierController.getSupplierById);
router.put("/:id", protect, authorise("Admin"), supplierController.updateSupplier);
router.delete("/:id", protect, authorise("Admin"),supplierController.deactivateSupplier);
router.post("/:id/products", protect, authorise("Admin"), supplierController.linkProduct);
router.delete("/:id/products/:productId", protect, authorise("Admin"), supplierController.unlinkProduct);

module.exports = router;