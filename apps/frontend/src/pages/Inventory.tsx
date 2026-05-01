import api from "../api/axios";
import { useEffect, useState } from "react";
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

const card: CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "6px",
  width: "150px",
};

const logRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #eee",
  padding: "8px 0",
};

const Inventory = () => {
  const [view, setView] = useState<"logs" | "summary">("logs");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch data based on view
  const fetchData = async () => {
    setLoading(true);

    try {
      const endpoint =
        view === "logs" ? "/inventory" : "/inventory/summary";

      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  

  return (
    <div>
      <h2>Inventory</h2>

      {/* 🔘 Toggle Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setView("logs")}
          disabled={view === "logs"}
          style={{ marginRight: "10px" }}
        >
          Logs
        </button>

        <button
          onClick={() => setView("summary")}
          disabled={view === "summary"}
        >
          Current Stock
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Loading...</p>}

      {/* 📜 Logs View */}
  {view === "logs" && !loading && (
  <div>
    <h3>Transaction History</h3>

    {data.map((log: any) => (
      <div key={log._id} style={logRow}>
        <strong>{log.productId?.name}</strong>

        <span>
          {log.type === "SALE" ? "🔻 Sold" : "🔺 Restocked"}
        </span>

        <span>{log.change}</span>

        <span>
          {new Date(log.createdAt).toLocaleString()}
        </span>
      </div>
    ))}
  </div>
)}
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  
  <div style={card}>
    <h4>Total Products</h4>
    <p>{data.length}</p>
  </div>

  {/* <div style={card}>
  <h4>Total Sales</h4>
  <p>
  {Array.isArray(data)
    ? data.reduce(
        (sum, item) => sum + (item.totalSales || 0),
        0
      )
    : 0}
</p>
</div> */}

</div>
      {/* 📊 Summary View */}
   {view === "summary" && !loading && (
  <div>
    <h3>Inventory Overview</h3>

    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>Product</th>
          <th style={th}>Stock</th>
          <th style={th}>Sales</th>
          <th style={th}>Last Updated</th>
          <th style={th}>Stock status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item: any, index: number) => (
<tr key={index}>
  <td style={td}>{item.productName}</td>

  <td style={td}>
    {item.totalStock <= 0 ? "⚠️ Out of Stock" : item.totalStock}
  </td>

  <td style={td}>{item.totalSales}</td>

  <td style={td}>
    {new Date(item.lastUpdated).toLocaleString()}
  </td>
  <td style={td}>
  {item.totalStock <= 0 && "🔴 Out"}
  {item.totalStock > 0 && item.totalStock < 5 && "🟡 Low"}
  {item.totalStock >= 5 && "🟢 Good"}
</td>
</tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
};

export default Inventory;