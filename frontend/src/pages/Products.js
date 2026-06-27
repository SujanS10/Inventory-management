import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    barcode: "",
    price: "",
    quantity: "",
  });

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://inventory-management-o0bg.onrender.com/api/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://inventory-management-o0bg.onrender.com/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= OPEN ADD =================
  const openAdd = () => {
    setForm({
      name: "",
      sku: "",
      barcode: "",
      price: "",
      quantity: "",
    });

    setEditMode(false);
    setOpen(true);
  };

  // ================= OPEN EDIT =================
  const openEdit = (product, e) => {
    e.stopPropagation(); // IMPORTANT FIX

    setForm({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: product.price,
      quantity: product.quantity,
    });

    setSelectedId(product._id);
    setEditMode(true);
    setOpen(true);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(
          `https://inventory-management-o0bg.onrender.com/api/products/${selectedId}`,
          {
            ...form,
            price: Number(form.price),
            quantity: Number(form.quantity),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "https://inventory-management-o0bg.onrender.com/api/products",
          {
            ...form,
            price: Number(form.price),
            quantity: Number(form.quantity),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Save failed");
    }
  };

  // ================= STOCK IN =================
  const stockIn = async () => {
    try {
      if (!selectedProduct) return alert("Select a product first");
      if (quantity <= 0) return alert("Invalid quantity");

      await axios.post(
        "https://inventory-management-o0bg.onrender.com/api/stock/in",
        {
          productId: selectedProduct,
          quantity: Number(quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Stock IN failed");
    }
  };

  // ================= STOCK OUT =================
  const stockOut = async () => {
    try {
      if (!selectedProduct) return alert("Select a product first");
      if (quantity <= 0) return alert("Invalid quantity");

      await axios.post(
        "https://inventory-management-o0bg.onrender.com/api/stock/out",
        {
          productId: selectedProduct,
          quantity: Number(quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Stock OUT failed");
    }
  };

  // ================= UI =================
  return (
    <Layout>
      <h1>📦 Products</h1>

      <Button variant="contained" onClick={openAdd}>
        ➕ Add Product
      </Button>

      {/* STOCK CONTROL */}
      <div style={{ marginTop: 20 }}>
        <h3>
          Stock Control (Selected:{" "}
          {selectedProduct || "None"})
        </h3>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={stockIn}
          style={{ marginRight: 10 }}
        >
          Stock IN
        </Button>

        <Button variant="contained" color="error" onClick={stockOut}>
          Stock OUT
        </Button>
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedProduct(p._id)}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginTop: 10,
              borderRadius: 8,
              cursor: "pointer",
              background:
                selectedProduct === p._id ? "#e0f2fe" : "white",
            }}
          >
            <h3>{p.name}</h3>
            <p>SKU: {p.sku}</p>
            <p>Price: ₹{p.price}</p>
            <p>Qty: {p.quantity}</p>

            <Button
              variant="outlined"
              size="small"
              onClick={(e) => openEdit(p, e)}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>

            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(p._id);
              }}
            >
              Delete
            </Button>
          </div>
        ))
      )}

      {/* MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editMode ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>
          {Object.keys(form).map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="dense"
              label={field}
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Products;