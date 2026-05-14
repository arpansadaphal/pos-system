import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  Store,
  Users,
  LogOut,
  WifiOff,
} from "lucide-react";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { useNetworkStore } from "../store/networkStore";

const Layout = () => {
  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  const isOnline = useNetworkStore(
    (state) => state.isOnline
  );

  const location = useLocation();

  const menuItems = [
    {
      name: "POS",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package size={20} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <Boxes size={20} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-2xl flex flex-col justify-between">

        {/* TOP SECTION */}
        <div>

          {/* LOGO */}
          <div className="p-6 border-b border-gray-200">

            <div className="flex items-center gap-3">
              
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                P
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
                  POS System
                </h1>

                <p className="text-sm text-gray-500">
                  Smart Store Dashboard
                </p>
              </div>
            </div>

            {/* ROLE BADGE */}
            <div className="mt-5">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                {user?.role}
              </span>
            </div>
          </div>

          {/* OFFLINE ALERT */}
          {!isOnline && (
            <div className="mx-5 mt-5 bg-red-500 text-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg animate-pulse">
              
              <WifiOff size={20} />

              <span className="font-medium">
                Offline Mode Active
              </span>
            </div>
          )}

          {/* NAVIGATION */}
          <nav className="p-5 space-y-3">

            {menuItems.map((item) => {
              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <div
                    className={`transition-transform duration-300 ${
                      active
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span className="font-semibold text-[15px]">
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* ADMIN ROUTES */}
            {user?.role === "ADMIN" && (
              <Link
                to="/stores"
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === "/stores"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <Store size={20} />

                <span className="font-semibold">
                  Stores
                </span>
              </Link>
            )}

            {/* ADMIN + MANAGER */}
            {(user?.role === "ADMIN" ||
              user?.role === "MANAGER") && (
              <Link
                to="/users"
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === "/users"
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <Users size={20} />

                <span className="font-semibold">
                  Users
                </span>
              </Link>
            )}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="p-5 border-t border-gray-200">

          {/* USER PROFILE */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-5 shadow-sm">

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
              {user?.role?.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.role}
              </h3>

              <p className="text-sm text-gray-500">
                Logged In
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* PAGE CONTAINER */}
        <div className="min-h-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;