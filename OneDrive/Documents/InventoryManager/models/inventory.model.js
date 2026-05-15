const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantityInStock: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    reorderQuantity: { type: Number, required: true },
    lastReorderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);

