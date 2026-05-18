const express = require("express");
const router = express.Router();
const shipmentController = require("../controller/shipmentController");

router.post("/shipments", shipmentController.createShipment);
router.get("/shipments", shipmentController.getShipments);
router.get("/shipments/:id", shipmentController.getShipmentById);
router.put("/shipments/:id/dispatched", shipmentController.dispatchedShipment);
router.put("/shipments/:id/delivered", shipmentController.deliveredShipment);
router.put("/shipments/:id/failed", shipmentController.failedShipment);

module.exports = router;
