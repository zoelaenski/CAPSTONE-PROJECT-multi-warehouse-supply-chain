const express = require("express");
const router = express.Router();
const warehouseController = require("../controller/warehouseController");

router.post("/warehouse", warehouseController.createWarehouse);
router.get("/warehouses", warehouseController.getWarehouse);

module.exports = router;
