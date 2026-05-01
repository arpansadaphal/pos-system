import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Layout = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h3>POS System</h3>
        <p>{user?.role}</p>

        <nav>
          <Link to="/">POS</Link><br />
          <Link to="/products">Products</Link><br />
          <Link to="/orders">Orders</Link><br />
          <Link to="/inventory">Inventory</Link><br />
        </nav>

        <button onClick={logout} style={{ marginTop: "20px" }}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;