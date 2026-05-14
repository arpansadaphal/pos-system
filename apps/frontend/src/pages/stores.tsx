// import { useState } from "react";
// import api from "../api/axios";

// const Stores = () => {
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");

//   const createStore = async () => {
//     await api.post("/stores", { name, location });

//     setName("");
//     setLocation("");

//     alert("Store created");
//   };

//   return (
//     <div>
//       <h2>Create Store</h2>

//       <input
//         placeholder="Store Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         placeholder="Location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />

//       <button onClick={createStore}>Create</button>
//     </div>
//   );
// };

// export default Stores;

import { useEffect, useState } from "react";
import api from "../api/axios";

const Stores = () => {
const [stores, setStores] = useState<any[]>([]);

const [name, setName] = useState("");
const [location, setLocation] = useState("");

const [loading, setLoading] = useState(false);
const [creating, setCreating] = useState(false);

// 📦 Fetch stores
const fetchStores = async () => {
setLoading(true);

try {
const res = await api.get("/stores");

setStores(res.data);
} catch (err) {
console.log(err);
alert("Failed to load stores");
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchStores();
}, []);

// ➕ Create store
const createStore = async () => {
try {
if (!name || !location) {
alert("All fields required");
return;
}

setCreating(true);

await api.post("/stores", {
name,
location,
});

setName("");
setLocation("");

await fetchStores();

alert("Store created successfully");
} catch (err) {
console.log(err);
alert("Failed to create store");
} finally {
setCreating(false);
}
};

return (
<div
style={{
minHeight: "100vh",
background: "#111827",
color: "#f9fafb",
padding: "25px",
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
fontSize: "32px",
}}
>
Store Management
</h1>

<p
style={{
color: "#9ca3af",
marginTop: "8px",
}}
>
Manage retail stores, branches, and locations
</p>
</div>

{/* TOP GRID */}
<div
style={{
display: "grid",
gridTemplateColumns: "350px 1fr",
gap: "20px",
alignItems: "start",
}}
>
{/* CREATE STORE PANEL */}
<div
style={{
background: "#1f2937",
padding: "20px",
borderRadius: "12px",
border: "1px solid #374151",
position: "sticky",
top: "20px",
}}
>
<h2
style={{
marginTop: 0,
marginBottom: "20px",
}}
>
Create Store
</h2>

{/* STORE NAME */}
<div style={{ marginBottom: "15px" }}>
<label
style={{
display: "block",
marginBottom: "8px",
color: "#d1d5db",
}}
>
Store Name
</label>

<input
placeholder="Downtown Branch"
value={name}
onChange={(e) =>
setName(e.target.value)
}
style={{
width: "100%",
padding: "12px",
borderRadius: "8px",
border: "1px solid #374151",
background: "#111827",
color: "white",
outline: "none",
}}
/>
</div>

{/* LOCATION */}
<div style={{ marginBottom: "20px" }}>
<label
style={{
display: "block",
marginBottom: "8px",
color: "#d1d5db",
}}
>
Location
</label>

<input
placeholder="Pune, Maharashtra"
value={location}
onChange={(e) =>
setLocation(e.target.value)
}
style={{
width: "100%",
padding: "12px",
borderRadius: "8px",
border: "1px solid #374151",
background: "#111827",
color: "white",
outline: "none",
}}
/>
</div>

{/* BUTTON */}
<button
onClick={createStore}
disabled={creating}
style={{
width: "100%",
padding: "14px",
border: "none",
borderRadius: "8px",
background: creating
? "#374151"
: "#2563eb",
color: "white",
fontWeight: 700,
cursor: creating
? "not-allowed"
: "pointer",
fontSize: "15px",
}}
>
{creating
? "Creating..."
: "Create Store"}
</button>
</div>

{/* STORES LIST */}
<div
style={{
background: "#1f2937",
borderRadius: "12px",
border: "1px solid #374151",
padding: "20px",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px",
}}
>
<h2 style={{ margin: 0 }}>
All Stores
</h2>

<div
style={{
background: "#111827",
padding: "8px 14px",
borderRadius: "8px",
color: "#9ca3af",
fontSize: "14px",
}}
>
{stores.length} stores
</div>
</div>

{/* LOADING */}
{loading && (
<p style={{ color: "#9ca3af" }}>
Loading stores...
</p>
)}

{/* EMPTY */}
{!loading && stores.length === 0 && (
<div
style={{
padding: "40px",
textAlign: "center",
color: "#9ca3af",
}}
>
No stores created yet
</div>
)}

{/* STORE GRID */}
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fill,minmax(260px,1fr))",
gap: "18px",
}}
>
{stores.map((store) => (
<div
key={store._id}
style={{
background: "#111827",
border: "1px solid #374151",
borderRadius: "12px",
padding: "18px",
}}
>
{/* STORE NAME */}
<h3
style={{
marginTop: 0,
marginBottom: "10px",
color: "#ffffff",
}}
>
{store.name}
</h3>

{/* LOCATION */}
<p
style={{
color: "#9ca3af",
marginBottom: "15px",
}}
>
📍 {store.location}
</p>

{/* STORE ID */}
<div
style={{
background: "#1f2937",
padding: "10px",
borderRadius: "8px",
fontSize: "12px",
color: "#6b7280",
wordBreak: "break-all",
}}
>
{store._id}
</div>

{/* CREATED DATE */}
<p
style={{
marginTop: "15px",
fontSize: "13px",
color: "#6b7280",
}}
>
Created{" "}
{new Date(
store.createdAt
).toLocaleDateString()}
</p>
</div>
))}
</div>
</div>
</div>
</div>
);
};

export default Stores;