// 

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useCartStore } from "../store/cartStore";
// import Cart from "../components/Cart";
// import { useAuthStore } from "../store/authStore";

// const POS = () => {
// const [products, setProducts] = useState<any[]>([]);
// const [search, setSearch] = useState("");
// const [loading, setLoading] = useState(false);
// const [online, setOnline] = useState(navigator.onLine);

// const addItem = useCartStore((state) => state.addItem);
// const items = useCartStore((state) => state.items);
// const clearCart = useCartStore((state) => state.clearCart);

// const user = useAuthStore((state) => state.user);
// const logout = useAuthStore((state) => state.logout);

// // 🌐 Online / Offline detection
// useEffect(() => {
// const goOnline = () => setOnline(true);
// const goOffline = () => setOnline(false);

// window.addEventListener("online", goOnline);
// window.addEventListener("offline", goOffline);

// return () => {
// window.removeEventListener("online", goOnline);
// window.removeEventListener("offline", goOffline);
// };
// }, []);

// // 🔍 Fetch products
// const fetchProducts = async () => {
// if (!user?.storeId) {
// console.log("No storeId found in user");
// return;
// }

// setLoading(true);

// try {
// const res = await api.get(
// `/products?search=${search}&storeId=${user.storeId}&limit=50`
// );

// setProducts(res.data);

// console.log("Products loaded:", res.data);
// console.log("Current user:", user);
// } catch (err: unknown) {
// const message =
// err instanceof Error
// ? err.message
// : "Failed to load products";

// console.log("Fetch error:", message);
// alert("Failed to load products");
// } finally {
// setLoading(false);
// }
// };

// // 🚀 Initial load
// useEffect(() => {
// if (user?.storeId) {
// fetchProducts();
// }
// }, [user]);

// // 🔍 Debounced search
// useEffect(() => {
// const delay = setTimeout(() => {
// if (user?.storeId) {
// fetchProducts();
// }
// }, 300);

// return () => clearTimeout(delay);
// }, [search]);

// // 🧮 Cart calculations
// const subtotal = items.reduce(
// (sum, item) => sum + item.price * item.quantity,
// 0
// );

// const tax = subtotal * 0.05;

// const discount = subtotal > 5000 ? subtotal * 0.1 : 0;

// const total = subtotal + tax - discount;

// // 💳 Checkout
// const checkout = async () => {
// try {
// if (!user?.id) {
// alert("User not loaded");
// return;
// }

// if (!user?.storeId) {
// alert("Store not assigned");
// return;
// }

// if (items.length === 0) {
// alert("Cart is empty");
// return;
// }

// console.log("Checkout store:", user.storeId);

// await api.post("/orders", {
// storeId: user.storeId,
// cashierId: user.id,

// items: items.map((item) => ({
// productId: item.productId,
// quantity: item.quantity,
// price: item.price,
// })),
// });

// clearCart();

// alert("Order placed successfully!");

// // 🔄 Refresh stock after sale
// fetchProducts();
// } catch (err: any) {
// console.log(
// "Checkout error:",
// err?.response?.data || err.message
// );

// alert(
// err?.response?.data?.message || "Checkout failed"
// );
// }
// };

// return (
// <div style={{ padding: "20px" }}>
// <h1>POS Terminal</h1>

// {/* 🌐 Network Status */}
// {!online && (
// <p style={{ color: "red" }}>
// Offline Mode — reconnect required for checkout
// </p>
// )}

// {loading && <p>Loading...</p>}

// <div
// style={{
// display: "flex",
// gap: "20px",
// flexWrap: "wrap",
// }}
// >
// {/* LEFT SIDE */}
// <div style={{ flex: 2, minWidth: "300px" }}>
// {/* 🔍 Search */}
// <input
// autoFocus
// placeholder="Search product..."
// value={search}
// onChange={(e) => setSearch(e.target.value)}
// onKeyDown={(e) => {
// if (e.key === "Enter") {
// fetchProducts();
// }
// }}
// style={{
// width: "100%",
// marginBottom: "10px",
// padding: "10px",
// }}
// />

// {/* 📦 Product List */}
// {products.map((p: any) => (
// <div
// key={p._id}
// style={{
// borderBottom: "1px solid #ccc",
// padding: "12px 0",
// }}
// >
// <h3>{p.name}</h3>

// <p>₹{p.price}</p>

// <p>
// Stock:{" "}
// {p.stock <= 0 ? (
// <span style={{ color: "red" }}>
// Out of Stock
// </span>
// ) : (
// p.stock
// )}
// </p>

// <button
// disabled={p.stock <= 0}
// onClick={() =>
// addItem({
// productId: p._id,
// name: p.name,
// price: p.price,
// quantity: 1,
// })
// }
// >
// {p.stock <= 0 ? "Out of Stock" : "Add"}
// </button>
// </div>
// ))}
// </div>

// {/* RIGHT SIDE */}
// <div
// style={{
// flex: 1,
// borderLeft: "1px solid #ccc",
// paddingLeft: "10px",
// minWidth: "280px",
// }}
// >
// <Cart />

// <hr />

// {/* 💰 Totals */}
// <div>
// <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

// <p>Tax (5%): ₹{tax.toFixed(2)}</p>

// <p>Discount: ₹{discount.toFixed(2)}</p>

// <h3>Total: ₹{total.toFixed(2)}</h3>
// </div>

// {/* 💳 Checkout */}
// <button
// onClick={checkout}
// disabled={!online || items.length === 0}
// style={{
// marginTop: "10px",
// width: "100%",
// padding: "10px",
// }}
// >
// Checkout
// </button>

// <button
// onClick={logout}
// style={{
// marginTop: "10px",
// width: "100%",
// padding: "10px",
// }}
// >
// Logout
// </button>
// </div>
// </div>
// </div>
// );
// };

// export default POS;


import { useEffect, useState } from "react";
import api from "../api/axios";
import Cart from "../components/Cart";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

const POS = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // 🌐 Online/offline
  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  // 📦 Fetch products
  const fetchProducts = async () => {
    if (!user?.storeId) return;

    setLoading(true);

    try {
      const res = await api.get(
        `/products?search=${search}&storeId=${user.storeId}&limit=50`
      );

      setProducts(res.data);
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

  // 🔍 Search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(delay);
  }, [search]);

  // 💰 Totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;

  const discount =
    subtotal > 5000 ? subtotal * 0.1 : 0;

  const total = subtotal + tax - discount;

  // 💳 Checkout
  const checkout = async () => {
    try {
      if (!user?.storeId) {
        alert("Store missing");
        return;
      }

      if (items.length === 0) {
        alert("Cart empty");
        return;
      }

      await api.post("/orders", {
        storeId: user.storeId,
        cashierId: user.id,

        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      clearCart();

      alert("Order placed successfully");

      fetchProducts();
    } catch (err: any) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          "Checkout failed"
      );
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "15px",
          borderBottom: "1px solid #374151",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#ffffff",
            }}
          >
            POS Terminal
          </h1>

          {/* <p
            style={{
              marginTop: "8px",
              color: "#9ca3af",
            }}
          >
            Logged in as{" "}
            <strong>{user?.email}</strong>
          </p> */}
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            color: "white",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      {/* OFFLINE */}
      {!online && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fecaca",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          Offline mode — checkout disabled
        </div>
      )}

      {/* MAIN */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* PRODUCTS */}
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #374151",
          }}
        >
          {/* SEARCH */}
          <input
            autoFocus
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #374151",
              background: "#111827",
              color: "white",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {loading && (
            <p style={{ color: "#9ca3af" }}>
              Loading products...
            </p>
          )}

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(220px,1fr))",
              gap: "18px",
            }}
          >
            {products.map((p: any) => (
              <div
                key={p._id}
                style={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  padding: "16px",
                  transition: "0.2s",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                    color: "#f9fafb",
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#10b981",
                    marginBottom: "10px",
                  }}
                >
                  ₹{p.price}
                </p>

                {/* <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  {p.stock <= 0 ? (
                    <span
                      style={{
                        color: "#ef4444",
                        fontWeight: 600,
                      }}
                    >
                      ● Out of Stock
                    </span>
                  ) : p.stock < 5 ? (
                    <span
                      style={{
                        color: "#f59e0b",
                        fontWeight: 600,
                      }}
                    >
                      ● Low Stock ({p.stock})
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#10b981",
                        fontWeight: 600,
                      }}
                    >
                      ● In Stock ({p.stock})
                    </span>
                  )}
                </div> */}
                

                <button
                  disabled={p.stock <= 0}
                  onClick={() =>
                    addItem({
                      productId: p._id,
                      name: p.name,
                      price: p.price,
                      quantity: 1,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      p.stock <= 0
                        ? "#374151"
                        : "#2563eb",
                    color: "white",
                    cursor:
                      p.stock <= 0
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {p.stock <= 0
                    ? "Unavailable"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CART */}
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #374151",
            position: "sticky",
            top: "20px",
            height: "fit-content",
          }}
        >
          <Cart />

          <hr
            style={{
              borderColor: "#374151",
              margin: "20px 0",
            }}
          />

          {/* BILL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "#d1d5db",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#f59e0b",
              }}
            >
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>

            <hr style={{ borderColor: "#374151" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={checkout}
            disabled={!online || items.length === 0}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "16px",
              border: "none",
              borderRadius: "10px",
              background:
                !online || items.length === 0
                  ? "#374151"
                  : "#10b981",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              cursor:
                !online || items.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
