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
 * @route   POST /transfers
 * @desc    Request a new warehouse transfer
 * @access  Authenticated (any role)
 */
router.post("/", requestTransfer);

/**
 * @route   GET /transfers
 * @desc    List all transfers (filterable by status, fromWarehouse, toWarehouse)
 * @access  Authenticated
 */
router.get("/", getAllTransfers);

/**
 * @route   GET /transfers/:id
 * @desc    Get a single transfer by ID
 * @access  Authenticated
 */
router.get("/:id", getTransferById);

// ── Transfer lifecycle actions ────────────────────────────────────────────────

/**
 * @route   PUT /transfers/:id/approve
 * @desc    Approve a pending transfer
 * @access  Admin only
 */
router.put("/:id/approve", authorise("Admin"), approveTransfer);

/**
 * @route   PUT /transfers/:id/complete
 * @desc    Complete an approved transfer (updates inventory in both warehouses)
 * @access  Admin or Staff
 */
router.put("/:id/complete", authorise("Admin", "Staff"), completeTransfer);

/**
 * @route   PUT /transfers/:id/cancel
 * @desc    Cancel a pending or approved transfer
 * @access  Authenticated (service enforces status rules)
 */
router.put("/:id/cancel", cancelTransfer);

module.exports = router;