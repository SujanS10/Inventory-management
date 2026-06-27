import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/alerts/low-stock",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlerts(res.data);
      setError("");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to load alerts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>🚨 Low Stock Alerts</h1>

        <div
          style={{
            background: "#ef4444",
            color: "white",
            padding: "8px 15px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          {alerts.length} Alerts
        </div>
      </div>

      {loading && <h3>Loading alerts...</h3>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div
          style={{
            background: "#dcfce7",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🎉 No low-stock products found
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {alerts.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
              borderLeft: "6px solid #ef4444",
            }}
          >
            <h3>{p.name}</h3>

            <p>
              <strong>SKU:</strong> {p.sku}
            </p>

            <p>
              <strong>Barcode:</strong>{" "}
              {p.barcode}
            </p>

            <p>
              <strong>Current Stock:</strong>{" "}
              {p.quantity}
            </p>

            <p>
              <strong>Minimum Required:</strong>{" "}
              {p.lowStockThreshold}
            </p>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  background: "#ef4444",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                Low Stock
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Alerts;