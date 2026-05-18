const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    SKU: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative'],
    },
    unitOfMeasurement: {
      type: String,
      required: [true, 'Unit of measurement is required'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate SKU if not provided
productSchema.pre('save', async function (next) {
  if (!this.SKU) {
    const count = await mongoose.model('Product').countDocuments();
    this.SKU = `SKU-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);