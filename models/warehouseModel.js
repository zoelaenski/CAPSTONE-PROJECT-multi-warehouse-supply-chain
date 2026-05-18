const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    _id: { type: String, alias: "name" },
    location: { type: String, required: true },
    capacity: { type: String, enum: ["space available", "space unavailable"] },
    managerName: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
