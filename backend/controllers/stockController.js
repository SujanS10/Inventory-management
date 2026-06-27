const Product = require("../models/Product");
const StockHistory = require("../models/StockHistory");

// ================= STOCK IN =================
exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.quantity += Number(quantity);
    await product.save();

    // ✅ SAVE HISTORY
    await StockHistory.create({
      product: product._id,
      type: "IN",
      quantity: Number(quantity),
      performedBy: req.user.id,
    });

    res.json({
      message: "Stock added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= STOCK OUT =================
exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.quantity < Number(quantity)) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    product.quantity -= Number(quantity);
    await product.save();

    // ✅ SAVE HISTORY
    await StockHistory.create({
      product: product._id,
      type: "OUT",
      quantity: Number(quantity),
      performedBy: req.user.id,
    });

    res.json({
      message: "Stock removed successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= HISTORY =================
exports.getHistory = async (req, res) => {
  try {
    const history = await StockHistory.find()
      .populate("product")
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};