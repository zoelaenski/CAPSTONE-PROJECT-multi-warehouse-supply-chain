const mongoose = require("mongoose");
const { Schema } = mongoose;

const transferItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const transferSchema = new Schema(
  {
    transferNumber: {
      type: String,
      unique: true,
      // Auto-generated before save — see pre-save hook below
    },
    fromWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: [true, "Source warehouse is required"],
    },
    toWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: [true, "Destination warehouse is required"],
    },
    items: {
      type: [transferItemSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one item is required for a transfer",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "in-transit", "completed", "cancelled"],
        message: "Status must be one of: pending, approved, in-transit, completed, cancelled",
      },
      default: "pending",
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Requesting user is required"],
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    cancelReason: {
      type: String,
      trim: true,
      maxlength: [300, "Cancel reason cannot exceed 300 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ──────────────────────────────────────────────────────────────────
transferSchema.index({ transferNumber: 1 });
transferSchema.index({ status: 1 });
transferSchema.index({ fromWarehouse: 1 });
transferSchema.index({ toWarehouse: 1 });
transferSchema.index({ requestedBy: 1 });
transferSchema.index({ createdAt: -1 });

// ── Pre-save: generate transferNumber ────────────────────────────────────────
transferSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("Transfer").countDocuments();
    this.transferNumber = `TRF-${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

// ── Validation: source ≠ destination ────────────────────────────────────────
transferSchema.pre("validate", function (next) {
  if (
    this.fromWarehouse &&
    this.toWarehouse &&
    this.fromWarehouse.toString() === this.toWarehouse.toString()
  ) {
    return next(new Error("Source and destination warehouses must be different"));
  }
  next();
});

module.exports = mongoose.model("Transfer", transferSchema);