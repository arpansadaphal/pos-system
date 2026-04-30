import { useEffect, useState } from "react";
import api from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

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
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
};

export default Products;