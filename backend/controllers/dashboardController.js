const Product = require("../models/Product");

exports.getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

    const inventoryValue = products.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0
    );

    res.json({
      totalProducts,
      totalStock,
      inventoryValue
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};