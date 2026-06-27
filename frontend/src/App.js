import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import BarcodeLookup from "./pages/BarcodeLookup";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import AdminLayout from "./components/AdminLayout";

/* ================= AUTH GUARD ================= */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* ================= LAYOUT WRAPPER ================= */
function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

/* ================= WRAPPED ROUTE ================= */
function ProtectedPage({ Component }) {
  return (
    <ProtectedRoute>
      <Layout>
        <Component />
      </Layout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<ProtectedPage Component={Dashboard} />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<ProtectedPage Component={Products} />}
        />

        {/* BARCODE */}
        <Route
          path="/barcode"
          element={<ProtectedPage Component={BarcodeLookup} />}
        />

        {/* ALERTS */}
        <Route
          path="/alerts"
          element={<ProtectedPage Component={Alerts} />}
        />

        {/* HISTORY */}
        <Route
          path="/history"
          element={<ProtectedPage Component={History} />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;