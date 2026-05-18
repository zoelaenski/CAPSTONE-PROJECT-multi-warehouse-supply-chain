const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    fromWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
      required: true,
    }, //make this a string now for simplification purposes.
    destination: { type: String, required: true },
    item: [{ type: String, required: true }], //item should be an array of products as well as the quantity. Of course it is required. You do not want to ship nothing.
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

module.exports = mongoose.model("Shipment", shipmentSchema);
