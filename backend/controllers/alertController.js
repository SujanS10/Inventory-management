const Product = require("../models/Product");

// Get low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: {
        $lte: ["$quantity", "$lowStockThreshold"]
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get low stock alert count
exports.getAlertCount = async (req, res) => {
  try {
    const count = await Product.countDocuments({
      $expr: {
        $lte: ["$quantity", "$lowStockThreshold"]
      }
    });

    res.json({
      count
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};