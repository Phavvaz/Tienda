import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;

  const productCount = await Product.countDocuments();
  const products = await Product.find({})
    .sort({ name: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res
    .status(200)
    .json({ products, page, pages: Math.ceil(productCount / pageSize) });
});

// @desc    Fetch A Single Products
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Create A Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    countInStock,
    image,
    brand,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error('Product not created');
  }
});

// @desc    Update A Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    countInStock,
    image,
    brand,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name || product.name),
      (product.price = price || product.price);
    product.description = description || product.description;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not updated!');
  }
});

// @desc    Delete A Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Create A New Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();
    res.status(201);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Get Top Rated Products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

export {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
};
