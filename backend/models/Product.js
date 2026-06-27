const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 📦 Product Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🆔 SKU (unique product code)
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // 📊 Barcode (used for scanner)
    barcode: {
      type: String,
      unique: true,
      sparse: true, // allows null values safely
      trim: true,
    },

    // 🏷 Category (for filtering)
    category: {
      type: String,
      default: "General",
      index: true,
    },

    // 💰 Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // 📦 Stock quantity
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ⚠️ Low stock limit
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 Index for faster search (IMPORTANT for your search feature)
productSchema.index({ name: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);