const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Warehouse name is required'],
      trim: true,
    },
    location: {
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    },
    capacity: {
      total: { type: Number, default: 0 },
      used: { type: Number, default: 0 },
    },
    managerName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

warehouseSchema.virtual('availableCapacity').get(function () {
  return this.capacity.total - this.capacity.used;
});

module.exports = mongoose.model('Warehouse', warehouseSchema);