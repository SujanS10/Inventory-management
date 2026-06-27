import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiUser,
  FiClock,
  FiTrash2,
} from "react-icons/fi";
import Layout from "../components/Layout";
import { Button } from "@mui/material";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {
    try {
      setLoading(true);

      if (!token) {
        setError("Please login first");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Failed to load history"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= CLEAR HISTORY =================
  const clearHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL history?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory([]);
      alert("History cleared successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to clear history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Layout>
      {/* HEADER */}
      <div style={{ marginBottom: "25px" }}>
        <h1>📜 Stock History</h1>
        <p style={{ color: "#64748b" }}>
          View all inventory transactions
        </p>

        {history.length > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<FiTrash2 />}
            onClick={clearHistory}
          >
            Clear History
          </Button>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div style={loadingStyle}>Loading history...</div>
      )}

      {/* ERROR */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* EMPTY */}
      {!loading && !error && history.length === 0 && (
        <div style={emptyStyle}>
          No stock history available
        </div>
      )}

      {/* HISTORY LIST */}
      {!loading && !error && history.length > 0 && (
        <div style={gridStyle}>
          {history.map((h, index) => (
            <motion.div
              key={h._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              style={cardStyle}
            >
              <div style={headerStyle}>
                <h3>
                  {h.product?.name || "Deleted Product"}
                </h3>

                <span
                  style={{
                    ...badgeStyle,
                    background:
                      h.type === "IN" ? "#dcfce7" : "#fee2e2",
                    color:
                      h.type === "IN" ? "#166534" : "#991b1b",
                  }}
                >
                  {h.type === "IN" ? (
                    <>
                      <FiArrowDownCircle /> STOCK IN
                    </>
                  ) : (
                    <>
                      <FiArrowUpCircle /> STOCK OUT
                    </>
                  )}
                </span>
              </div>

              <div style={infoStyle}>
                <strong>Quantity:</strong>
                <span>{h.quantity}</span>
              </div>

              <div style={infoStyle}>
                <FiUser />
                <span>{h.performedBy?.name || "System"}</span>
              </div>

              <div style={infoStyle}>
                <FiClock />
                <span>
                  {h.createdAt
                    ? new Date(h.createdAt).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
}

/* ---------- STYLES ---------- */

const loadingStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
};

const errorStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "15px",
  borderRadius: "12px",
};

const emptyStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
};

const badgeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
};

const infoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
  color: "#475569",
};

export default History;