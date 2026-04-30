import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Layout = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", borderRight: "1px solid gray" }}>
        <h3>POS System</h3>

        <nav>
          <Link to="/">POS</Link>
          <br />
          <Link to="/products">Products</Link>
          <br />
          <button onClick={logout}>Logout</button>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;