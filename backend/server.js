const dns = require("dns");

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("DNS Servers:", dns.getServers());

// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ================= APP =================
const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://inventory-management-frontend-qvkq.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ================= ROUTES =================

// Home Route
app.get("/", (req, res) => {
  res.send("Inventory API Running");
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Product Routes
app.use("/api/products", require("./routes/productRoutes"));

// Stock Routes
app.use("/api/stock", require("./routes/stockRoutes"));

// Alert Routes
app.use("/api/alerts", require("./routes/alertRoutes"));

// Dashboard Routes
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// History Routes
app.use("/api/history", require("./routes/historyRoutes"));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});