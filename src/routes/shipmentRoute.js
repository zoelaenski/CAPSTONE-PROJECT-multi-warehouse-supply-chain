const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

router.post("/shipment", shipmentController.createShipment);
router.get("/shipments", shipmentController.getShipments);
router.get("/shipments/dispatched", shipmentController.dispatched);
router.get("/shipments/delivered", shipmentController.delivered);
router.get("/shipments/failed", shipmentController.failed);
router.get(
  "/shipmentsFromWarehouse/:warehouseId",
  shipmentController.fromThisWarehouse,
);
router.get("/shipments/:id", shipmentController.getShipmentById);
router.put("/shipments/:id/dispatched", shipmentController.dispatchedShipment);
router.put("/shipments/:id/delivered", shipmentController.deliveredShipment);
router.put("/shipments/:id/failed", shipmentController.failedShipment);

module.exports = router;
