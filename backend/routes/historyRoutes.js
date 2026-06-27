const express = require("express");
const router = express.Router();

const StockHistory = require("../models/StockHistory");
const { protect } = require("../middleware/authMiddleware");

// ================= GET HISTORY =================
router.get("/", protect, async (req, res) => {
  try {
    const history = await StockHistory.find()
      .populate("product")
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to get history" });
  }
});

// ================= DELETE ALL HISTORY =================
router.delete("/", protect, async (req, res) => {
  try {
    await StockHistory.deleteMany({});   // 🔥 THIS IS DELETE ALL

    res.json({ message: "All history deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete history" });
  }
});

module.exports = router;