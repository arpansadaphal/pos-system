// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   stock?: number;
// };

// const Products = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const[editName, setEditName] = useState("");
//   const[editPrice, setEditPrice] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [initialStock, setInitialStock] = useState("");

//   const user = useAuthStore((state) => state.user);

//   const fetchProducts = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data);
//     console.log("Fetched products:", res.data);
//   };

//   // ...existing code...

// useEffect(() => {
//   const loadProducts = async () => {
//     // Assuming fetchProducts is now async and handles state internally
//     await fetchProducts();
//   };
//   loadProducts();
// }, []);

// // ...existing code...

//   const createProduct = async () => {
//   try {
//     if (!name || !price) {
//       alert("Name and price required");
//       return;
//     }

//     if (!user?.storeId) {
//       alert("User storeId missing");
//       return;
//     }

//     await api.post("/products", {
//       name,
//       price: Number(price),
//       storeId: user.storeId,
//       initialStock: Number(initialStock || 0),
//     });

//     alert("Product created");

//     setName("");
//     setPrice("");
//     setInitialStock("");

//     fetchProducts();
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Create failed";
//     alert(message);
//   }
// };

//   const updateProduct = async (id: string) => {
//   try {
//     await api.put(`/products/${id}`, {
//       // name,
//       // price: Number(price),
//       name: editName,
//       price: Number(editPrice),
//     });

//     alert("Updated");

//     setEditingId(null);
//     // setName("");
//     // setPrice("");
//     setEditName("");
//     setEditPrice("");

//     fetchProducts();
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Update failed";
//     alert(message);
//   }
// };

// // const deleteProduct = async (id: string) => {
// //   await api.delete(`/products/${id}`);
// //   fetchProducts();
// // };

// const deleteProduct = async (id: string) => {
//   try {
//     await api.delete(`/products/${id}`);
//     alert("Deleted");
//     fetchProducts();
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Delete failed";
//     alert(message);
//   }
// };

//   return (
//     <div>
//       <h2>Products</h2>

//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <input
//         placeholder="Initial Stock"
//         value={initialStock}
//         onChange={(e) => setInitialStock(e.target.value)}
//       />
//       <button onClick={createProduct}>Add</button>

//       <hr />

//      {products.map((p: Product) => (
//   <div key={p._id}>
//     {editingId === p._id ? (
//       <>
//         {/* <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         /> */}
//         <input
//           value={editName}
//           onChange={(e) => setEditName(e.target.value)}
//         />
//         <input
//           value={editPrice}
//           onChange={(e) => setEditPrice(e.target.value)}
//         />

//         <button onClick={() => updateProduct(p._id)}>Save</button>
//         <button onClick={()=>{
//           setEditingId(null);
//           setEditName("");
//           setEditPrice("");
//         }}>
//           cancel
//         </button>
//       </>
//     ) : (
//       <>
//         {p.name} - ₹{p.price}

//         <button
//           onClick={() => {
//             setEditingId(p._id);
//             // setName(p.name);
//             // setPrice(p.price);
//             setEditName(p.name);
//             setEditPrice(String(p.price));
//           }}
//         >
//           Edit
//         </button>

//         <button onClick={() => deleteProduct(p._id)}>
//           Delete
//         </button>

//         {/* <p>User Store: {user?.storeId || "NO STORE ID"}</p> */}
//         {/* <p>User: {JSON.stringify(user)}</p> */}
//         {/* <p>{user?.storeId}</p> */}
//         <p>Stock: {p.stock}</p>
//       </>
//     )}
//   </div>
// ))}
//     </div>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock?: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [initialStock, setInitialStock] = useState("");

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  // 📦 Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products?storeId=${user?.storeId}`);

      setProducts(res.data);

      console.log("Fetched products:", res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.storeId) {
      fetchProducts();
    }
  }, [user]);

  // ➕ Create Product
  const createProduct = async () => {
    try {
      if (!name || !price) {
        alert("Name and price required");
        return;
      }

      if (!user?.storeId) {
        alert("Store missing");
        return;
      }

      await api.post("/products", {
        name,
        price: Number(price),
        storeId: user.storeId,
        initialStock: Number(initialStock || 0),
      });

      alert("Product created");

      setName("");
      setPrice("");
      setInitialStock("");

      fetchProducts();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Create failed");
    }
  };

  // ✏️ Update Product
  const updateProduct = async (id: string) => {
    try {
      await api.put(`/products/${id}`, {
        name: editName,
        price: Number(editPrice),
      });

      alert("Product updated");

      setEditingId(null);
      setEditName("");
      setEditPrice("");

      fetchProducts();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  // 🗑️ Delete Product
  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product deleted");

      fetchProducts();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#f9fafb",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "25px",
          borderBottom: "1px solid #374151",
          paddingBottom: "15px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
          }}
        >
          Product Management
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px",
          }}
        >
          Manage inventory catalog, pricing, and stock
        </p>
      </div>

      {/* CREATE PRODUCT */}
      <div
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Add Product
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "15px",
          }}
        >
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Initial Stock"
            value={initialStock}
            onChange={(e) => setInitialStock(e.target.value)}
            style={inputStyle}
          />

          <button onClick={createProduct} style={primaryButton}>
            Create Product
          </button>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 2fr",
            padding: "16px",
            background: "#111827",
            borderBottom: "1px solid #374151",
            fontWeight: 700,
            color: "#d1d5db",
          }}
        >
          <div>Product</div>
          <div>Price</div>
          {/* <div>Stock</div> */}
          <div>Actions</div>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              padding: "20px",
              color: "#9ca3af",
            }}
          >
            Loading products...
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div
            style={{
              padding: "20px",
              color: "#9ca3af",
            }}
          >
            No products found
          </div>
        )}

        {/* PRODUCT ROWS */}
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 2fr",
              padding: "16px",
              borderBottom: "1px solid #374151",
              alignItems: "center",
            }}
          >
            {/* EDIT MODE */}
            {editingId === p._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={inputStyle}
                />

                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  style={inputStyle}
                />

                <div>-</div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => updateProduct(p._id)}
                    style={successButton}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditName("");
                      setEditPrice("");
                    }}
                    style={dangerButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* NAME */}
                <div>
                  <strong>{p.name}</strong>
                </div>

                {/* PRICE */}
                <div
                  style={{
                    color: "#10b981",
                    fontWeight: 700,
                  }}
                >
                  ₹{p.price}
                </div>

                {/* STOCK */}
                {/* <div>
                  {p.stock === undefined ? (
                    <span
                      style={{
                        color: "#9ca3af",
                      }}
                    >
                      N/A
                    </span>
                  ) : p.stock <= 0 ? (
                    <span
                      style={{
                        color: "#ef4444",
                        fontWeight: 700,
                      }}
                    >
                      ● Out
                    </span>
                  ) : p.stock < 5 ? (
                    <span
                      style={{
                        color: "#f59e0b",
                        fontWeight: 700,
                      }}
                    >
                      ● Low ({p.stock})
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#10b981",
                        fontWeight: 700,
                      }}
                    >
                      ● {p.stock}
                    </span>
                  )}
                </div> */}

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  <button
                    onClick={() => {
                      setEditingId(p._id);
                      setEditName(p.name);
                      setEditPrice(String(p.price));
                    }}
                    style={primaryButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={dangerButton}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 🎨 Shared Styles

const inputStyle: React.CSSProperties = {
  background: "#111827",
  border: "1px solid #374151",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const primaryButton: React.CSSProperties = {
  background: "#2563eb",
  border: "none",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

const successButton: React.CSSProperties = {
  background: "#10b981",
  border: "none",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

const dangerButton: React.CSSProperties = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

export default Products;
