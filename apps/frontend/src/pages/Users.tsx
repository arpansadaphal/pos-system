import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import type { CSSProperties } from "react";

const th: CSSProperties = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "8px",
};

const td: CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px",
};


const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CASHIER");
  const [storeId, setStoreId] = useState("");
const user = useAuthStore((s) => s.user);
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

const fetchStores = async () => {
  try {
    const res = await api.get("/stores");

    // alert(JSON.stringify(res.data)); // 🔥 shows response

    setStores(res.data);
  } catch (err: any) {
    alert(JSON.stringify(err?.response?.data)); // 🔥 shows real error
  }
};

  useEffect(() => {
    fetchUsers();
    fetchStores();
  }, []);

const createUser = async () => {
  try {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    alert("Sending request..."); // DEBUG

    const res = await api.post("/users", {
      email,
      password,
      role,
      storeId,
    });

    alert("User created!"); // DEBUG

    setEmail("");
    setPassword("");
    fetchUsers();
  } catch (err: any) {
    alert(JSON.stringify(err.response.data));
  }
};

  return (
    <div>
      <h2>User Management</h2>
     <h3>Current Role: {user?.role}</h3>
      <h3>Create User</h3>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="CASHIER">Cashier</option>
        <option value="MANAGER">Manager</option>
        <option value="ADMIN">Admin</option>
      </select>

      <select value={storeId} onChange={(e) => setStoreId(e.target.value)}>
        <option value="">Select Store</option>
        {stores.map((s: any) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <button onClick={createUser}>Create</button>

      <hr />

   <h3>All Users</h3>

{users.length === 0 ? (
  <p>No users found</p>
) : (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={th}>Email</th>
        <th style={th}>Role</th>
        <th style={th}>Store</th>
        <th style={th}>Created</th>
        <th style={th}>Status</th>
      </tr>
    </thead>

    <tbody>
      {users.map((u: any) => (
        <tr key={u._id}>
          
          {/* Email */}
          <td style={td}>{u.email}</td>

          {/* Role Badge */}
          <td style={td}>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                background:
                  u.role === "ADMIN"
                    ? "#ffdddd"
                    : u.role === "MANAGER"
                    ? "#fff4cc"
                    : "#ddffdd",
              }}
            >
              {u.role}
            </span>
          </td>

          {/* Store */}
          <td style={td}>
            {u.storeId?.name || "—"}
          </td>

          {/* Created */}
          <td style={td}>
            {new Date(u.createdAt).toLocaleDateString()}
          </td>

          {/* Status (placeholder for now) */}
          <td style={td}>
            <span style={{ color: u.isActive ? "green" : "red" }}>
              {u.isActive ? "Active" : "Inactive"}
            </span>
          </td>
            <button
  onClick={async () => {
  try {
    // alert("Calling API...");

const res = await api.patch(`/users/${u._id}/toggle`);

//    alert(JSON.stringify({
//   status: res.status,
// })); // 🔥 FULL RESPONSE

    fetchUsers();
  } catch (err: any) {
    alert(JSON.stringify(err?.response?.data || err.message));
  }
}}
>
  {u.isActive ? "Deactivate" : "Activate"}
</button>

        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  );
};

export default Users;