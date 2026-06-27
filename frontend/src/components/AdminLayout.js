import { Link, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    marginBottom: "8px",
    borderRadius: "10px",
    textDecoration: "none",
    color: isActive(path) ? "#0ea5e9" : "#cbd5e1",
    background: isActive(path)
      ? "rgba(14,165,233,0.15)"
      : "transparent",
    fontWeight: isActive(path) ? "600" : "400",
    transition: "all 0.2s ease",
  });

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>📦 Inventory Admin</h2>

        <nav>
          <Link style={linkStyle("/dashboard")} to="/dashboard">
            📊 Dashboard
          </Link>

          <Link style={linkStyle("/products")} to="/products">
            📦 Products
          </Link>

          <Link style={linkStyle("/barcode")} to="/barcode">
            📷 Barcode
          </Link>

          <Link style={linkStyle("/alerts")} to="/alerts">
            ⚠️ Alerts
          </Link>

          <Link style={linkStyle("/history")} to="/history">
            📜 History
          </Link>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div style={styles.main}>

        {/* TOP BAR */}
        <header style={styles.topbar}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>
            Inventory Management System
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={styles.avatar}>A</div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main style={styles.content}>
          {children}
        </main>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  sidebar: {
    width: "240px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
  },

  logo: {
    marginBottom: "25px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f1f5f9",
  },

  topbar: {
    height: "60px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },

  content: {
    padding: "20px",
    overflowY: "auto",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
  },

  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#0ea5e9",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
};

export default AdminLayout;