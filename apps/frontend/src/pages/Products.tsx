import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialStock, setInitialStock] = useState("");
  
  const user = useAuthStore((state) => state.user);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const createProduct = async () => {
  try {
    if (!name || !price) {
      alert("Name and price required");
      return;
    }

    if (!user?.storeId) {
      alert("User storeId missing");
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


  const updateProduct = async (id: string) => {
  try {
    await api.put(`/products/${id}`, {
      name,
      price: Number(price),
    });

    alert("Updated");

    setEditingId(null);
    setName("");
    setPrice("");

    fetchProducts();
  } catch (err: any) {
    alert(err?.response?.data?.message || "Update failed");
  }
};

const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
  fetchProducts();
};

  return (
    <div>
      <h2>Products</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Initial Stock"
        value={initialStock}
        onChange={(e) => setInitialStock(e.target.value)}
      />
      <button onClick={createProduct}>Add</button>

      <hr />

     {products.map((p: any) => (
  <div key={p._id}>
    {editingId === p._id ? (
      <>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={() => updateProduct(p._id)}>Save</button>
      </>
    ) : (
      <>
        {p.name} - ₹{p.price}

        <button
          onClick={() => {
            setEditingId(p._id);
            setName(p.name);
            setPrice(p.price);
          }}
        >
          Edit
        </button>

        <button onClick={() => deleteProduct(p._id)}>
          Delete
        </button>
        {/* <p>User Store: {user?.storeId || "NO STORE ID"}</p> */}
        {/* <p>User: {JSON.stringify(user)}</p> */}
        {/* <p>{user?.storeId}</p> */}
      </>
    )}
  </div>
))}
    </div>
  );
};

export default Products;