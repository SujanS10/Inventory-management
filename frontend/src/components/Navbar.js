import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "#1f2937",
        color: "white",
        alignItems: "center",
      }}
    >
      <h3>📦 Inventory System</h3>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link style={{ color: "white" }} to="/dashboard">
          Dashboard
        </Link>
        <Link style={{ color: "white" }} to="/barcode">
          Barcode
        </Link>
        <Link style={{ color: "white" }} to="/products">
          Products
        </Link>
        <Link style={{ color: "white" }} to="/alerts">
          Alerts
        </Link>
        <Link style={{ color: "white" }} to="/history">
          History
        </Link>

        <button style={{ background: "red", color: "white" }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;