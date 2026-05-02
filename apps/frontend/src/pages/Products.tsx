import { useEffect, useState } from "react";
import api from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const createProduct = async () => {
    await api.post("/products", {
      name,
      price: Number(price),
    });

    setName("");
    setPrice("");
    fetchProducts();
  };

  const updateProduct = async (id: string) => {
  await api.put(`/products/${id}`, {
    name,
    price: Number(price),
  });

  setEditingId(null);
  setName("");
  setPrice("");
  fetchProducts();
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
      </>
    )}
  </div>
))}
    </div>
  );
};

export default Products;