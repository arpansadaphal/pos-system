import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useNetworkStore } from "./store/networkStore";
import Login from "./pages/Login";
import POS from "./pages/POS";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Stores from "./pages/stores";
import Users from "./pages/Users";


function App() {
  const { initialize } = useAuthStore();
  const setOnline = useNetworkStore((s) => s.setOnline);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
       
        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          
          <Route path="/" element={<POS />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* <Route path="/products" element={<Products />} /> */}
          <Route
            path="/stores"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Stores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
          path="/products"
          element={
            <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { useEffect } from "react";
// import { useAuthStore } from "./store/authStore";
// import POS from "./pages/POS";
// import Login from "./pages/Login";

// function App() {
//   const { token, initialize } = useAuthStore();

//   useEffect(() => {
//     initialize();
//   }, []);

//   // 🔐 simple route protection
//   if (!token) return <Login />;

//   return <POS />;
// }

// export default App;