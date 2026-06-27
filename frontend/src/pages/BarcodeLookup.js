import { useState } from "react";
import axios from "axios";
import BarcodeScanner from "../components/BarcodeScanner";
import Layout from "../components/Layout";

function BarcodeLookup() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const scanBarcode = async (barcode) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.get(
        `http://https://inventory-management-o0bg.onrender.com/api/products/barcode/${barcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct(res.data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Product not found");
    }
  };

  const stockIn = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://https://inventory-management-o0bg.onrender.com/api/stock/add",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock Added");

      setProduct((prev) =>
        prev
          ? { ...prev, quantity: prev.quantity + 1 }
          : prev
      );
    } catch (error) {
      console.error(error);
      alert("Stock In failed");
    }
  };

  const stockOut = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://https://inventory-management-o0bg.onrender.com/api/stock/remove",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock Removed");

      setProduct((prev) =>
        prev
          ? { ...prev, quantity: prev.quantity - 1 }
          : prev
      );
    } catch (error) {
      console.error(error);
      alert("Stock Out failed");
    }
  };

  return (
    <Layout>
      <h1>📷 Barcode Lookup</h1>

      <BarcodeScanner onDetected={scanBarcode} />

      {/* ❌ ERROR */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* 📦 PRODUCT CARD */}
      {product && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{product.name}</h2>

          <p>SKU: {product.sku}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ₹{product.price}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => stockIn(product._id)}>
              ➕ Stock In
            </button>

            <button onClick={() => stockOut(product._id)}>
              ➖ Stock Out
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BarcodeLookup;