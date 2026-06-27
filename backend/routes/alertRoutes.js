const express = require("express");

const router = express.Router();

const {
  getLowStockProducts,
  getAlertCount
} = require("../controllers/alertController");

const {
  protect
} = require("../middleware/authMiddleware");

// Get low stock products
router.get(
  "/low-stock",
  protect,
  getLowStockProducts
);

// Get low stock alert count
router.get(
  "/count",
  protect,
  getAlertCount
);

module.exports = router;