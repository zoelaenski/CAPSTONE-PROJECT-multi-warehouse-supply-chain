const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipment.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorise } = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Create a new shipment
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               fromWarehouse:
 *                 type: string
 *               toWarehouse:
 *                 type: string
 *               items:
 *                 type: array
 *     responses:
 *       201:
 *         description: Shipment created successfully
 */
router.post(
  "/",
  protect,
  authorise("Admin"),
  shipmentController.createShipment
);

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Get all shipments
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipments retrieved successfully
 */
router.get("/", protect, shipmentController.getShipments);

/**
 * @swagger
 * /api/shipments/dispatched:
 *   get:
 *     summary: Get dispatched shipments
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dispatched shipments retrieved
 */
router.get("/dispatched", protect, shipmentController.dispatched);

/**
 * @swagger
 * /api/shipments/delivered:
 *   get:
 *     summary: Get delivered shipments
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivered shipments retrieved
 */
router.get("/delivered", protect, shipmentController.delivered);

/**
 * @swagger
 * /api/shipments/failed:
 *   get:
 *     summary: Get failed shipments
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Failed shipments retrieved
 */
router.get("/failed", protect, shipmentController.failed);

/**
 * @swagger
 * /api/shipments/from/{warehouseId}:
 *   get:
 *     summary: Get shipments from a warehouse
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipments retrieved successfully
 */
router.get(
  "/from/:warehouseId",
  protect,
  shipmentController.fromThisWarehouse
);

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Get shipment by ID
 *     tags: [Shipments]
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
 *         description: Shipment retrieved successfully
 *       404:
 *         description: Not found
 */
router.get("/:id", protect, shipmentController.getShipmentById);

/**
 * @swagger
 * /api/shipments/{id}/dispatched:
 *   put:
 *     summary: Mark shipment as dispatched
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipment marked as dispatched
 */
router.put(
  "/:id/dispatched",
  protect,
  authorise("Admin"),
  shipmentController.dispatchedShipment
);

/**
 * @swagger
 * /api/shipments/{id}/delivered:
 *   put:
 *     summary: Mark shipment as delivered
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipment marked as delivered
 */
router.put(
  "/:id/delivered",
  protect,
  authorise("Admin"),
  shipmentController.deliveredShipment
);

/**
 * @swagger
 * /api/shipments/{id}/failed:
 *   put:
 *     summary: Mark shipment as failed
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipment marked as failed
 */
router.put(
  "/:id/failed",
  protect,
  authorise("Admin"),
  shipmentController.failedShipment
);

module.exports = router;
