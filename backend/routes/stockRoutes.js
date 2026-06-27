const express = require("express");
const router = express.Router();

const {
  stockIn,
  stockOut,
  getHistory,
} = require("../controllers/stockController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

/* ================= STOCK IN ================= */
router.post(
  "/in",
  protect,
  authorize("Admin", "Manager"),
  stockIn
);

/* ================= STOCK OUT ================= */
router.post(
  "/out",
  protect,
  authorize("Admin", "Manager"),
  stockOut
);

/* ================= STOCK HISTORY ================= */
router.get(
  "/history",
  protect,
  getHistory
);

module.exports = router;