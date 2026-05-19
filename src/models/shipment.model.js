const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      unique: true,
      index: true,
    },
    fromWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
      required: true,
    }, //make this a string now for simplification purposes.
    destination: { type: String, required: true },
    item: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    ], //item should be an array of products as well as the quantity. Of course it is required. You do not want to ship nothing.
    carrier: { type: String, required: true },
    status: {
      type: String,
      enum: ["preparing", "dispatched", "in-transit", "delivered", "failed"],
      default: "preparing",
    },
    dispatchedAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    proofOfDelivery: { type: String }, //only gets updated when the shipment's status says delivered.
  },
  { timestamps: true },
);

shipmentSchema.pre("save", async function (next) {
  if (!this.trackingNumber) {
    this.trackingNumber = await generateTrackingNumber();
  }
  next();
});

async function generateTrackingNumber() {
  const prefix = "TRK";
  const timestamp = Date.now().toString(36).toUpperCase(); // base-36 timestamp
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

module.exports = mongoose.model("Shipment", shipmentSchema);
