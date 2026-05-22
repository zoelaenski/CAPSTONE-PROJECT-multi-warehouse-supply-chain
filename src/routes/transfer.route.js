const express = require("express");
const router = express.Router();

const {
  requestTransfer,
  getAllTransfers,
  getTransferById,
  approveTransfer,
  completeTransfer,
  cancelTransfer,
} = require("../controllers/transfer.controller");

/**
 * Auth middleware imports — adjust paths to match your project structure.
 *
 *  authenticate  — verifies JWT and attaches req.user
 *  authorizeRoles — restricts access to specific roles
 */
const { protect } = require("../middlewares/auth.middleware");
const { authorise } = require("../middlewares/role.middleware");


// ── All routes require a valid JWT ────────────────────────────────────────────
router.use(protect);

// ── Transfer CRUD ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/transfers:
 *   post:
 *     summary: Request a new warehouse transfer
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromWarehouse:
 *                 type: string
 *               toWarehouse:
 *                 type: string
 *               product:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transfer request created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", requestTransfer);

/**
 * @route   GET /transfers
 * @desc    List all transfers (filterable by status, fromWarehouse, toWarehouse)
 * @access  Authenticated
 */

/**
 * @swagger
 * /api/transfers:
 *   get:
 *     summary: Get all warehouse transfers
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transfers retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAllTransfers);

/**
 * @route   GET /transfers/:id
 * @desc    Get a single transfer by ID
 * @access  Authenticated
 */

/**
 * @swagger
 * /api/transfers/{id}:
 *   get:
 *     summary: Get a transfer by ID
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transfer ID
 *     responses:
 *       200:
 *         description: Transfer retrieved successfully
 *       404:
 *         description: Transfer not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getTransferById);

// ── Transfer lifecycle actions ────────────────────────────────────────────────

/**
 * @route   PUT /transfers/:id/approve
 * @desc    Approve a pending transfer
 * @access  Admin only
 */

/**
 * @swagger
 * /api/transfers/{id}/approve:
 *   put:
 *     summary: Approve a pending transfer
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transfer ID
 *     responses:
 *       200:
 *         description: Transfer approved successfully
 *       400:
 *         description: Invalid status change
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.put("/:id/approve", authorise("Admin"), approveTransfer);

/**
 * @route   PUT /transfers/:id/complete
 * @desc    Complete an approved transfer (updates inventory in both warehouses)
 * @access  Admin or Staff
 */

/**
 * @swagger
 * /api/transfers/{id}/complete:
 *   put:
 *     summary: Complete an approved transfer
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transfer ID
 *     responses:
 *       200:
 *         description: Transfer completed successfully
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id/complete", authorise("Admin", "Staff"), completeTransfer);

/**
 * @route   PUT /transfers/:id/cancel
 * @desc    Cancel a pending or approved transfer
 * @access  Authenticated (service enforces status rules)
 */

/**
 * @swagger
 * /api/transfers/{id}/cancel:
 *   put:
 *     summary: Cancel a transfer
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transfer ID
 *     responses:
 *       200:
 *         description: Transfer cancelled successfully
 *       400:
 *         description: Cannot cancel transfer in current state
 *       401:
 *         description: Unauthorized
 */
router.put("/:id/cancel", cancelTransfer);

module.exports = router;