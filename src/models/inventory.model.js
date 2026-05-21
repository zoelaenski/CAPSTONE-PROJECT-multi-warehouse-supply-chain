const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: [true, 'Warehouse is required'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    quantityInStock: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
    reorderQuantity: {
      type: Number,
      default: 50,
    },
    lastRestocked: {
      type: Date,
    },
  },
  { timestamps: true }
);

// One product per warehouse only
inventorySchema.index({ warehouse: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);