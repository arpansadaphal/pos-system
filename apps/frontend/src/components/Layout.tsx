// import { Link, Outlet } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";
// import { useNetworkStore } from "../store/networkStore";

// const Layout = () => {
//   const logout = useAuthStore((state) => state.logout);
//   const user = useAuthStore((state) => state.user);
//   const isOnline = useNetworkStore((s) => s.isOnline);
  
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
      
//       {/* Sidebar */}
//       <div style={{ width: "220px", borderRight: "1px solid #ccc", padding: "10px" }}>
//         <h3>POS System</h3>
//         {!isOnline && (
//         <div style={{ background: "red", color: "white", padding: "5px" }}>
//           🔴 Offline Mode
//         </div>
//       )}
//         <p>{user?.role}</p>

//         <nav>
//           <Link to="/">POS</Link><br />
//           <Link to="/products">Products</Link><br />
//           <Link to="/orders">Orders</Link><br />
//           <Link to="/inventory">Inventory</Link><br />
//           {user?.role === "ADMIN" && (
//             <>
//               <Link to="/stores">Stores</Link><br />
//             </>
//           )}
//           {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
//             <>
//               <Link to="/users">Users</Link><br />
//             </>
//           )}
//         </nav>

//         <button onClick={logout} style={{ marginTop: "20px" }}>
//           Logout
//         </button>
//       </div>

//       {/* Main */}
//       <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

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
(s) => s.isOnline
);

const location = useLocation();

const linkStyle = (path: string) => ({
display: "block",
padding: "12px 14px",
marginBottom: "8px",
borderRadius: "10px",
textDecoration: "none",
fontWeight: 600,
transition: "0.2s",

background:
location.pathname === path
? "#2563eb"
: "transparent",

color:
location.pathname === path
? "white"
: "#d1d5db",

border:
location.pathname === path
? "none"
: "1px solid transparent",
});

return (
<div
style={{
display: "flex",
minHeight: "100vh",
background: "#111827",
color: "#f9fafb",
fontFamily: "Inter, sans-serif",
}}
>
{/* SIDEBAR */}
<aside
style={{
width: "260px",
background: "#0f172a",
borderRight: "1px solid #1e293b",
padding: "20px",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
position: "sticky",
top: 0,
height: "100vh",
}}
>
<div>
{/* LOGO */}
<div
style={{
marginBottom: "30px",
}}
>
<h2
style={{
margin: 0,
color: "#ffffff",
fontSize: "26px",
}}
>
POS System
</h2>

<p
style={{
color: "#9ca3af",
marginTop: "8px",
fontSize: "14px",
}}
>
Retail Management Dashboard
</p>
</div>

{/* OFFLINE */}
{!isOnline && (
<div
style={{
background: "#7f1d1d",
color: "#fecaca",
padding: "10px",
borderRadius: "10px",
marginBottom: "20px",
fontSize: "14px",
}}
>
🔴 Offline Mode
</div>
)}

{/* USER INFO */}
<div
style={{
background: "#111827",
border: "1px solid #1e293b",
borderRadius: "12px",
padding: "15px",
marginBottom: "25px",
}}
>
<p
style={{
margin: 0,
color: "#9ca3af",
fontSize: "13px",
}}
>
Logged in as
</p>

<h4
style={{
marginTop: "6px",
marginBottom: "6px",
color: "#ffffff",
}}
>
{user?.email}
</h4>

<span
style={{
background: "#2563eb",
padding: "5px 10px",
borderRadius: "999px",
fontSize: "12px",
fontWeight: 700,
}}
>
{user?.role}
</span>
</div>

{/* NAVIGATION */}
<nav>
<Link
to="/"
style={linkStyle("/")}
>
🛒 POS Terminal
</Link>

<Link
to="/products"
style={linkStyle("/products")}
>
📦 Products
</Link>

<Link
to="/orders"
style={linkStyle("/orders")}
>
🧾 Orders
</Link>

<Link
to="/inventory"
style={linkStyle("/inventory")}
>
📊 Inventory
</Link>

{(user?.role === "ADMIN" ||
user?.role === "MANAGER") && (
<Link
to="/users"
style={linkStyle("/users")}
>
👥 Users
</Link>
)}

{user?.role === "ADMIN" && (
<Link
to="/stores"
style={linkStyle("/stores")}
>
🏬 Stores
</Link>
)}
</nav>
</div>

{/* FOOTER */}
<div>
<button
onClick={logout}
style={{
width: "100%",
padding: "14px",
borderRadius: "10px",
border: "none",
background: "#ef4444",
color: "white",
fontWeight: 700,
cursor: "pointer",
fontSize: "15px",
}}
>
Logout
</button>
</div>
</aside>

{/* MAIN CONTENT */}
<main
style={{
flex: 1,
background: "#111827",
padding: "25px",
overflowY: "auto",
}}
>
<Outlet />
</main>
</div>
);
};

export default Layout;