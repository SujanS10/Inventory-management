const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getProductByBarcode
} = require("../controllers/productController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

router.get("/", protect, getProducts);

router.get("/low-stock", protect, getLowStockProducts);

// Barcode route MUST be before /:id
router.get(
  "/barcode/:barcode",
  protect,
  getProductByBarcode
);

router.post(
  "/",
  protect,
  authorize("Admin", "Manager"),
  addProduct
);

router.get("/:id", protect, getProduct);

router.put(
  "/:id",
  protect,
  authorize("Admin", "Manager"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteProduct
);

module.exports = router;