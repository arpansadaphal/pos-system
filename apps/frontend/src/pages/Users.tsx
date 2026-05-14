import { useEffect, useState } from "react";

import api from "../api/axios";

import { useAuthStore } from "../store/authStore";

import {
  Users,
  UserPlus,
  Mail,
  Lock,
  Shield,
  Store,
  Power,
  Search,
  Sparkles,
  UserCheck,
  UserX,
} from "lucide-react";

import { motion } from "framer-motion";

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [stores, setStores] = useState<any[]>([]);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("CASHIER");

  const [storeId, setStoreId] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const user = useAuthStore((s) => s.user);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  // FETCH STORES
  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");

      setStores(res.data);
    } catch (err) {
      alert("Failed to fetch stores");
    }
  };

  useEffect(() => {
    fetchUsers();

    fetchStores();
  }, []);

  // CREATE USER
  const createUser = async () => {
    try {
      if (
        !email ||
        !password ||
        !role ||
        !storeId
      ) {
        alert("Please fill all fields");

        return;
      }

      setLoading(true);

      await api.post("/users", {
        email,
        password,
        role,
        storeId,
      });

      alert("User Created Successfully");

      setEmail("");

      setPassword("");

      setRole("CASHIER");

      setStoreId("");

      fetchUsers();
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "User creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE USER STATUS
  const toggleUser = async (id: string) => {
    try {
      await api.patch(`/users/${id}/toggle`);

      fetchUsers();
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  // FILTER USERS
  const filteredUsers = users.filter((u: any) =>
    u.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 rounded-3xl">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

        <div>
          <h1 className="text-4xl font-black text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage users, permissions & access
          </p>
        </div>

        {/* CURRENT USER */}
        <div className="bg-white shadow-xl rounded-3xl px-6 py-4 flex items-center gap-4 border border-gray-100">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

            <Shield
              className="text-blue-600"
              size={28}
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Logged In As
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              {user?.role}
            </h2>
          </div>
        </div>
      </div>

      {/* CREATE USER FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl p-8 border border-gray-100 mb-8"
      >

        {/* TOP */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">

            <UserPlus size={32} />
          </div>

          <div>
            <h2 className="text-3xl font-black text-gray-800">
              Create New User
            </h2>

            <p className="text-gray-500 mt-1">
              Add employees and assign roles
            </p>
          </div>

          <Sparkles className="ml-auto text-indigo-500" />
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>

            <div className="relative mt-2">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              User Role
            </label>

            <div className="relative mt-2">

              <Shield
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="CASHIER">
                  Cashier
                </option>

                <option value="MANAGER">
                  Manager
                </option>

                <option value="ADMIN">
                  Admin
                </option>
              </select>
            </div>
          </div>

          {/* STORE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Assign Store
            </label>

            <div className="relative mt-2">

              <Store
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                value={storeId}
                onChange={(e) =>
                  setStoreId(e.target.value)
                }
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">
                  Select Store
                </option>

                {stores.map((s: any) => (
                  <option
                    key={s._id}
                    value={s._id}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={createUser}
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 disabled:opacity-70"
        >
          {loading
            ? "Creating User..."
            : "Create User"}
        </button>
      </motion.div>

      {/* SEARCH BAR */}
      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users by email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* USER GRID */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <Users
            size={60}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-5 text-2xl font-bold text-gray-700">
            No Users Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredUsers.map((u: any) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={u._id}
              className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-xl border border-gray-100 overflow-hidden"
            >

              {/* TOP BAR */}
              <div
                className={`h-2 ${
                  u.role === "ADMIN"
                    ? "bg-red-500"
                    : u.role === "MANAGER"
                    ? "bg-yellow-400"
                    : "bg-green-500"
                }`}
              ></div>

              <div className="p-6">

                {/* PROFILE */}
                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                    {u.email.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-gray-800 break-all">
                      {u.email}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {u.storeId?.name || "No Store"}
                    </p>
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-6 space-y-3">

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Role
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-red-100 text-red-600"
                          : u.role === "MANAGER"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Status
                    </span>

                    <span
                      className={`flex items-center gap-2 font-semibold ${
                        u.isActive
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {u.isActive ? (
                        <>
                          <UserCheck size={18} />
                          Active
                        </>
                      ) : (
                        <>
                          <UserX size={18} />
                          Inactive
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Joined
                    </span>

                    <span className="font-medium text-gray-700">
                      {new Date(
                        u.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button
                  onClick={() =>
                    toggleUser(u._id)
                  }
                  className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    u.isActive
                      ? "bg-red-50 hover:bg-red-100 text-red-600"
                      : "bg-green-50 hover:bg-green-100 text-green-600"
                  }`}
                >
                  <Power size={18} />

                  {u.isActive
                    ? "Deactivate User"
                    : "Activate User"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;