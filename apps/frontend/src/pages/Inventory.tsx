// import api from "../api/axios";
// import { useEffect, useState } from "react";
// import type { CSSProperties } from "react";

// const th: CSSProperties = {
//   borderBottom: "2px solid #ccc",
//   textAlign: "left",
//   padding: "8px",
// };

// const td: CSSProperties = {
//   borderBottom: "1px solid #eee",
//   padding: "8px",
// };

// const card: CSSProperties = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   borderRadius: "6px",
//   width: "150px",
// };

// const logRow: CSSProperties = {
//   display: "flex",
//   justifyContent: "space-between",
//   borderBottom: "1px solid #eee",
//   padding: "8px 0",
// };

// const Inventory = () => {
//   const [view, setView] = useState<"logs" | "summary">("logs");
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔄 Fetch data based on view
//   const fetchData = async () => {
//     setLoading(true);

//     try {
//       const endpoint =
//         view === "logs" ? "/inventory" : "/inventory/summary";

//       const res = await api.get(endpoint);
//       setData(res.data);
//     } catch (err: any) {
//       console.error(err);
//       alert(err?.response?.data?.message || "Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [view]);

  

//   return (
//     <div>
//       <h2>Inventory</h2>

//       {/* 🔘 Toggle Buttons */}
//       <div style={{ marginBottom: "15px" }}>
//         <button
//           onClick={() => setView("logs")}
//           disabled={view === "logs"}
//           style={{ marginRight: "10px" }}
//         >
//           Logs
//         </button>

//         <button
//           onClick={() => setView("summary")}
//           disabled={view === "summary"}
//         >
//           Current Stock
//         </button>
//       </div>

//       {/* ⏳ Loading */}
//       {loading && <p>Loading...</p>}

//       {/* 📜 Logs View */}
//   {view === "logs" && !loading && (
//   <div>
//     <h3>Transaction History</h3>

//     {data.map((log: any) => (
//       <div key={log._id} style={logRow}>
//         <strong>{log.productId?.name}</strong>

//         <span>
//           {log.type === "SALE" ? "🔻 Sold" : "🔺 Restocked"}
//         </span>

//         <span>{log.change}</span>

//         <span>
//           {new Date(log.createdAt).toLocaleString()}
//         </span>
//       </div>
//     ))}
//   </div>
// )}
//     <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  
//   <div style={card}>
//     <h4>Total Products</h4>
//     <p>{data.length}</p>
//   </div>

//   {/* <div style={card}>
//   <h4>Total Sales</h4>
//   <p>
//   {Array.isArray(data)
//     ? data.reduce(
//         (sum, item) => sum + (item.totalSales || 0),
//         0
//       )
//     : 0}
// </p>
// </div> */}

// </div>
//       {/* 📊 Summary View */}
//    {view === "summary" && !loading && (
//   <div>
//     <h3>Inventory Overview</h3>

//     <table style={{ width: "100%", borderCollapse: "collapse" }}>
//       <thead>
//         <tr>
//           <th style={th}>Product</th>
//           <th style={th}>Stock</th>
//           <th style={th}>Sales</th>
//           <th style={th}>Last Updated</th>
//           <th style={th}>Stock status</th>
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((item: any, index: number) => (
// <tr key={index}>
//   <td style={td}>{item.productName}</td>

//   <td style={td}>
//     {item.totalStock <= 0 ? "⚠️ Out of Stock" : item.totalStock}
//   </td>

//   <td style={td}>{item.totalSales}</td>

//   <td style={td}>
//     {new Date(item.lastUpdated).toLocaleString()}
//   </td>
//   <td style={td}>
//   {item.totalStock <= 0 && "🔴 Out"}
//   {item.totalStock > 0 && item.totalStock < 5 && "🟡 Low"}
//   {item.totalStock >= 5 && "🟢 Good"}
// </td>
// </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}
//     </div>
//   );
// };

// export default Inventory;

import api from "../api/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const Inventory = () => {
const [view, setView] = useState<"logs" | "summary">(
"summary"
);

const [data, setData] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);

const [loading, setLoading] = useState(false);

// Restock
const [productId, setProductId] = useState("");
const [quantity, setQuantity] = useState("");

const user = useAuthStore((state) => state.user);

// =========================
// FETCH INVENTORY
// =========================
const fetchData = async () => {
setLoading(true);

try {
const endpoint =
view === "logs"
? "/inventory"
: "/inventory/summary";

const res = await api.get(endpoint);

setData(res.data);
} catch (err: any) {
console.error(err);

alert(
err?.response?.data?.message ||
"Failed to fetch inventory"
);
} finally {
setLoading(false);
}
};

// =========================
// FETCH PRODUCTS
// =========================
const fetchProducts = async () => {
try {
const res = await api.get(
`/products?storeId=${user?.storeId || ""}`
);

setProducts(res.data);
} catch (err) {
console.error(err);
}
};

// =========================
// RESTOCK
// =========================
const restock = async () => {
try {
if (!productId || !quantity) {
alert("Select product and quantity");
return;
}

await api.post("/inventory/restock", {
productId,
storeId: user?.storeId,
quantity: Number(quantity),
});

alert("Product restocked successfully");

setProductId("");
setQuantity("");

fetchData();
fetchProducts();
} catch (err: any) {
console.error(err);

alert(
err?.response?.data?.message ||
"Restock failed"
);
}
};

useEffect(() => {
fetchData();
fetchProducts();
}, [view]);

return (
<div
style={{
minHeight: "100vh",
background: "#111827",
color: "#f9fafb",
padding: "20px",
fontFamily: "Inter, sans-serif",
}}
>
{/* HEADER */}
<div
style={{
marginBottom: "25px",
borderBottom: "1px solid #374151",
paddingBottom: "15px",
}}
>
<h1
style={{
margin: 0,
fontSize: "28px",
}}
>
Inventory Management
</h1>

<p
style={{
color: "#9ca3af",
marginTop: "8px",
}}
>
Track stock, restocks, and inventory
movement
</p>
</div>

{/* RESTOCK SECTION */}
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
padding: "20px",
marginBottom: "20px",
}}
>
<h2
style={{
marginTop: 0,
marginBottom: "20px",
}}
>
Restock Product
</h2>

<div
style={{
display: "flex",
gap: "12px",
flexWrap: "wrap",
}}
>
{/* PRODUCT */}
<select
value={productId}
onChange={(e) =>
setProductId(e.target.value)
}
style={{
flex: 1,
minWidth: "220px",
padding: "12px",
borderRadius: "8px",
border: "1px solid #374151",
background: "#111827",
color: "white",
}}
>
<option value="">
Select Product
</option>

{products.map((p: any) => (
<option
key={p._id}
value={p._id}
>
{p.name}
</option>
))}
</select>

{/* QUANTITY */}
<input
type="number"
placeholder="Quantity"
value={quantity}
onChange={(e) =>
setQuantity(e.target.value)
}
style={{
width: "150px",
padding: "12px",
borderRadius: "8px",
border: "1px solid #374151",
background: "#111827",
color: "white",
}}
/>

{/* BUTTON */}
<button
onClick={restock}
style={{
padding: "12px 20px",
border: "none",
borderRadius: "8px",
background: "#10b981",
color: "white",
fontWeight: 600,
cursor: "pointer",
}}
>
Restock
</button>
</div>
</div>

{/* TOP STATS */}
<div
style={{
display: "flex",
gap: "20px",
marginBottom: "20px",
flexWrap: "wrap",
}}
>
{/* TOTAL PRODUCTS */}
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
padding: "20px",
minWidth: "220px",
}}
>
<p
style={{
color: "#9ca3af",
marginBottom: "10px",
}}
>
Total Products
</p>

<h2 style={{ margin: 0 }}>
{view === "summary"
? data.length
: products.length}
</h2>
</div>

{/* LOW STOCK */}
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
padding: "20px",
minWidth: "220px",
}}
>
<p
style={{
color: "#9ca3af",
marginBottom: "10px",
}}
>
Low Stock Items
</p>

<h2
style={{
margin: 0,
color: "#f59e0b",
}}
>
{
data.filter(
(item: any) =>
item.totalStock > 0 &&
item.totalStock < 5
).length
}
</h2>
</div>

{/* OUT OF STOCK */}
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
padding: "20px",
minWidth: "220px",
}}
>
<p
style={{
color: "#9ca3af",
marginBottom: "10px",
}}
>
Out Of Stock
</p>

<h2
style={{
margin: 0,
color: "#ef4444",
}}
>
{
data.filter(
(item: any) =>
item.totalStock <= 0
).length
}
</h2>
</div>
</div>

{/* TOGGLES */}
<div
style={{
display: "flex",
gap: "12px",
marginBottom: "20px",
}}
>
<button
onClick={() => setView("summary")}
style={{
padding: "10px 18px",
border: "none",
borderRadius: "8px",
background:
view === "summary"
? "#2563eb"
: "#374151",
color: "white",
cursor: "pointer",
}}
>
Stock Overview
</button>

<button
onClick={() => setView("logs")}
style={{
padding: "10px 18px",
border: "none",
borderRadius: "8px",
background:
view === "logs"
? "#2563eb"
: "#374151",
color: "white",
cursor: "pointer",
}}
>
Transaction Logs
</button>
</div>

{/* LOADING */}
{loading && (
<p style={{ color: "#9ca3af" }}>
Loading inventory...
</p>
)}

{/* EMPTY */}
{!loading && data.length === 0 && (
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
padding: "20px",
borderRadius: "12px",
}}
>
No inventory data found
</div>
)}

{/* ========================= */}
{/* SUMMARY VIEW */}
{/* ========================= */}
{view === "summary" && !loading && (
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
overflow: "hidden",
}}
>
<table
style={{
width: "100%",
borderCollapse: "collapse",
}}
>
<thead
style={{
background: "#111827",
}}
>
<tr>
<th
style={{
padding: "16px",
textAlign: "left",
color: "#9ca3af",
}}
>
Product
</th>

<th
style={{
padding: "16px",
textAlign: "left",
color: "#9ca3af",
}}
>
Stock
</th>

<th
style={{
padding: "16px",
textAlign: "left",
color: "#9ca3af",
}}
>
Sales
</th>

<th
style={{
padding: "16px",
textAlign: "left",
color: "#9ca3af",
}}
>
Last Updated
</th>

<th
style={{
padding: "16px",
textAlign: "left",
color: "#9ca3af",
}}
>
Status
</th>
</tr>
</thead>

<tbody>
{data.map(
(
item: any,
index: number
) => (
<tr
key={index}
style={{
borderTop:
"1px solid #374151",
}}
>
<td
style={{
padding: "16px",
}}
>
{item.productName}
</td>

<td
style={{
padding: "16px",
fontWeight: 700,
}}
>
{item.totalStock}
</td>

<td
style={{
padding: "16px",
}}
>
{item.totalSales}
</td>

<td
style={{
padding: "16px",
color: "#9ca3af",
}}
>
{new Date(
item.lastUpdated
).toLocaleString()}
</td>

<td
style={{
padding: "16px",
}}
>
{item.totalStock <= 0 ? (
<span
style={{
color: "#ef4444",
fontWeight: 600,
}}
>
● Out
</span>
) : item.totalStock < 5 ? (
<span
style={{
color: "#f59e0b",
fontWeight: 600,
}}
>
● Low
</span>
) : (
<span
style={{
color: "#10b981",
fontWeight: 600,
}}
>
● Healthy
</span>
)}
</td>
</tr>
)
)}
</tbody>
</table>
</div>
)}

{/* ========================= */}
{/* LOGS VIEW */}
{/* ========================= */}
{view === "logs" && !loading && (
<div
style={{
background: "#1f2937",
border: "1px solid #374151",
borderRadius: "12px",
padding: "20px",
}}
>
<h2
style={{
marginTop: 0,
marginBottom: "20px",
}}
>
Transaction History
</h2>

{data.map((log: any) => (
<div
key={log._id}
style={{
display: "flex",
justifyContent:
"space-between",
alignItems: "center",
padding: "14px 0",
borderBottom:
"1px solid #374151",
flexWrap: "wrap",
gap: "10px",
}}
>
<div>
<strong>
{log.productId?.name ||
"Unknown Product"}
</strong>

<p
style={{
color: "#9ca3af",
marginTop: "5px",
marginBottom: 0,
}}
>
{new Date(
log.createdAt
).toLocaleString()}
</p>
</div>

<div>
{log.type === "SALE" ? (
<span
style={{
color: "#ef4444",
fontWeight: 700,
}}
>
🔻 Sale
</span>
) : (
<span
style={{
color: "#10b981",
fontWeight: 700,
}}
>
🔺 Restock
</span>
)}
</div>

<div
style={{
fontWeight: 700,
fontSize: "18px",
}}
>
{log.change}
</div>
</div>
))}
</div>
)}
</div>
);
};

export default Inventory;