const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipment.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorise } = require("../middlewares/role.middleware");

router.post(
  "/shipment",
  protect,
  authorise("Admin"),
  shipmentController.createShipment,
);
router.get("/shipments", protect, shipmentController.getShipments);
router.get("/shipments/dispatched", protect, shipmentController.dispatched);
router.get("/shipments/delivered", protect, shipmentController.delivered);
router.get("/shipments/failed", protect, shipmentController.failed);
router.get(
  "/shipmentsFromWarehouse/:warehouseId",
  protect,
  shipmentController.fromThisWarehouse,
);
router.get("/shipments/:id", protect, shipmentController.getShipmentById);
router.put(
  "/shipments/:id/dispatched",
  protect,
  authorise("Admin"),
  shipmentController.dispatchedShipment,
);
router.put(
  "/shipments/:id/delivered",
  protect,
  authorise("Admin"),
  shipmentController.deliveredShipment,
);
router.put(
  "/shipments/:id/failed",
  protect,
  authorise("Admin"),
  shipmentController.failedShipment,
);

module.exports = router;
