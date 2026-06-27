const Product = require("../models/Product");

// 🔥 GET PRODUCTS (WITH SEARCH + FILTERS)
exports.getProducts = async (req, res) => {
  try {
    const { search, category, lowStock } = req.query;

    let filter = {};

    // 🔍 SEARCH BY NAME (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 📦 CATEGORY FILTER
    if (category) {
      filter.category = category;
    }

    let products = await Product.find(filter);

    // ⚠️ LOW STOCK FILTER
    if (lowStock === "true") {
      products = products.filter(
        (p) => p.quantity <= p.lowStockThreshold
      );
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ➕ ADD PRODUCT
exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// ⚠️ LOW STOCK PRODUCTS (SEPARATE API)
exports.getLowStockProducts = async (req, res) => {
  const products = await Product.find({
    $expr: {
      $lte: ["$quantity", "$lowStockThreshold"],
    },
  });

  res.json(products);
};

// 📷 GET PRODUCT BY BARCODE
exports.getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({
      barcode: req.params.barcode,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📦 GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// ✏️ UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

// 🗑 DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product Deleted",
  });
};