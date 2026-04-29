import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCartStore } from "../store/cartStore";
import Cart from "../components/Cart";
import { decodeToken } from "../utils/decodeToken";
import { useAuthStore } from "../store/authStore";



const POS = () => {
  const [products, setProducts] = useState<any[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const token = localStorage.getItem("token");
  const user = token ? decodeToken(token) : null;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  
const fetchProducts = async () => {
  setLoading(true);

  try {
    const res = await api.get(`/products?search=${search}&limit=50`);

    setProducts(res.data);

    console.log("Products loaded:", res.data.length);
  } catch (err: any) {
    console.log("Fetch error:", err?.response?.data || err.message);
    alert("Failed to load products");
  } finally {
    setLoading(false);
  }
};

const items = useCartStore((state) => state.items);
const clearCart = useCartStore((state) => state.clearCart);

const checkout = async () => {
  try {
   await api.post("/orders", {
  storeId: "69ef2509033050635be1a588", // keep for now
  cashierId: user?.id,
  items: items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  })),
});

    clearCart();
    alert("Order placed successfully!");
  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  }
};
useEffect(() => {
  fetchProducts();
}, [search]);


return (
 <div>

    <h1>POS Terminal</h1>
    {loading && <p>Loading...</p>}
    <div style={{ display: "flex", gap: "20px" }}>
  
      {/* LEFT: PRODUCTS */}
      <div style={{ flex: 2 }}>

        {/* 🔍 Search */}
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {/* Product List */}
        {products.map((p: any) => (
          <div key={p._id} style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            
            <button
              onClick={() =>
                addItem({
                  productId: p._id,
                  name: p.name,
                  price: p.price,
                  quantity: 1,
                })
              }
            >
              Add
            </button>
            
          </div>
        ))}

      </div>

      {/* RIGHT: CART */}
      <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
        
        <Cart />

        {/* Checkout Button */}
        <button
          onClick={checkout}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Checkout
        </button>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  </div>
);
};

export default POS;