const Product = require('../models/product.model');

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProducts = async (query) => {
  const { page = 1, limit = 10, search } = query;

  const filter = { isActive: true };

  // Search by name or SKU
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { SKU: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate('category', 'name')
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return {
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category', 'name');
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('category', 'name');
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};