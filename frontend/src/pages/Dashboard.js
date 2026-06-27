import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import { Grid, Paper, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    inventoryValue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["Products", "Stock", "Value"],
    datasets: [
      {
        label: "Inventory Stats",
        data: [stats.totalProducts, stats.totalStock, stats.inventoryValue],
        backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b"],
      },
    ],
  };

  return (
    <Layout>
      <Box sx={{ padding: 3 }}>

        {/* HEADER */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          📊 Inventory Dashboard
        </Typography>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* STATS CARDS */}
            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <Paper sx={cardStyle("#3b82f6")}>
                  <h3>Products</h3>
                  <h1>{stats.totalProducts}</h1>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={cardStyle("#22c55e")}>
                  <h3>Stock</h3>
                  <h1>{stats.totalStock}</h1>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={cardStyle("#f59e0b")}>
                  <h3>Value</h3>
                  <h1>₹{stats.inventoryValue}</h1>
                </Paper>
              </Grid>

            </Grid>

            {/* CHART */}
            <Box sx={chartBox}>
              <h3>📈 Inventory Analytics</h3>
              <Bar data={chartData} />
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}

const cardStyle = (color) => ({
  padding: 3,
  textAlign: "center",
  borderTop: `5px solid ${color}`,
  borderRadius: 3,
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
});

const chartBox = {
  marginTop: 4,
  background: "#fff",
  padding: 3,
  borderRadius: 3,
};

export default Dashboard;