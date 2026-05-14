import { useState } from "react";

import api from "../api/axios";

import {
  Store,
  MapPin,
  Building2,
  PlusCircle,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const Stores = () => {
  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const createStore = async () => {
    try {
      if (!name || !location) {
        alert("Please fill all fields");

        return;
      }

      setLoading(true);

      await api.post("/stores", {
        name,
        location,
      });

      setName("");

      setLocation("");

      alert("Store Created Successfully");
    } catch (err) {
      console.log(err);

      alert("Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6 rounded-3xl">

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-2xl shadow-2xl rounded-[36px] overflow-hidden border border-white/40"
      >

        {/* TOP HEADER */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-10 text-white overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center gap-5">

            {/* ICON */}
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-lg">

              <Building2 size={42} />
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Create Store
              </h1>

              <p className="mt-2 text-blue-100">
                Add and manage your business stores
              </p>
            </div>
          </div>

          {/* FLOATING ICON */}
          <Sparkles
            size={28}
            className="absolute bottom-5 right-6 text-white/60"
          />
        </div>

        {/* FORM SECTION */}
        <div className="p-8">

          {/* STORE NAME */}
          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Store Name
            </label>

            <div className="relative">

              <Store
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter store name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="mb-8">

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Store Location
            </label>

            <div className="relative">

              <MapPin
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={createStore}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 disabled:opacity-70"
          >

            <PlusCircle size={22} />

            {loading
              ? "Creating Store..."
              : "Create Store"}
          </motion.button>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Your store will be added to the POS
            management system.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stores;