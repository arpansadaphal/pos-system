import { useEffect, useState } from "react";

import api from "../api/axios";

import { useAuthStore } from "../store/authStore";

import {
  Package2,
  Plus,
  Pencil,
  Trash2,
  IndianRupee,
  Boxes,
  Save,
  X,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [initialStock, setInitialStock] =
    useState("");

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [search, setSearch] = useState("");

  const user = useAuthStore((state) => state.user);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
    } catch (err) {
      console.log(err);

      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE PRODUCT
  const createProduct = async () => {
    try {
      if (!name || !price) {
        alert("Name and price required");
        return;
      }

      await api.post("/products", {
        name,
        price: Number(price),
        initialStock: Number(initialStock || 0),
        storeId: user?.storeId,
      });

      alert("Product Added Successfully");

      resetForm();

      fetchProducts();
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to create product"
      );
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async (id: string) => {
    try {
      await api.put(`/products/${id}`, {
        name,
        price: Number(price),
      });

      alert("Product Updated");

      resetForm();

      fetchProducts();
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Update failed"
      );
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // RESET FORM
  const resetForm = () => {
    setName("");

    setPrice("");

    setInitialStock("");

    setEditingId(null);
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter(
    (p: any) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6 rounded-3xl">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-black text-gray-800">
            Product Inventory
          </h1>

          <p className="text-gray-500 mt-2">
            Manage products, pricing & stock
          </p>
        </div>

        {/* TOTAL CARD */}
        <div className="bg-white shadow-xl rounded-3xl px-6 py-4 flex items-center gap-4 border border-gray-100">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

            <Package2
              className="text-blue-600"
              size={28}
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total Products
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {products.length}
            </h2>
          </div>
        </div>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-8 border border-gray-100"
      >

        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

            <Boxes
              className="text-blue-600"
              size={24}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>

            <p className="text-gray-500 text-sm">
              Fill in product details below
            </p>
          </div>
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Price
            </label>

            <div className="relative mt-2">

              <IndianRupee
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full pl-10 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Initial Stock
            </label>

            <input
              type="number"
              placeholder="Enter stock quantity"
              value={initialStock}
              onChange={(e) =>
                setInitialStock(e.target.value)
              }
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">

          {editingId ? (
            <>
              <button
                onClick={() =>
                  updateProduct(editingId)
                }
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
              >

                <Save size={18} />

                Save Changes
              </button>

              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition"
              >

                <X size={18} />

                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={createProduct}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
            >

              <Plus size={18} />

              Add Product
            </button>
          )}
        </div>
      </motion.div>

      {/* SEARCH */}
      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-11 px-4 py-4 rounded-2xl bg-white border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredProducts.map((p: any) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={p._id}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >

            {/* TOP BAR */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-6">

              {/* PRODUCT ICON */}
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">

                <Package2
                  className="text-blue-600"
                  size={30}
                />
              </div>

              {/* PRODUCT INFO */}
              <h2 className="text-2xl font-bold text-gray-800">
                {p.name}
              </h2>

              <div className="mt-5 space-y-3">

                <div className="flex justify-between items-center">

                  <span className="text-gray-500">
                    Price
                  </span>

                  <span className="font-bold text-blue-600 text-lg">
                    ₹{p.price}
                  </span>
                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-500">
                    Stock
                  </span>

                  <span
                    className={`font-semibold ${
                      p.stock <= 0
                        ? "text-red-500"
                        : p.stock < 5
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {p.stock || 0}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    setEditingId(p._id);

                    setName(p.name);

                    setPrice(p.price);

                    setInitialStock(
                      p.stock || "0"
                    );
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-2xl font-semibold transition"
                >

                  <Pencil size={18} />

                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(p._id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 py-3 rounded-2xl font-semibold transition"
                >

                  <Trash2 size={18} />

                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;