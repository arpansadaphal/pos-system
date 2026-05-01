import { useEffect, useState } from "react";
import api from "../api/axios";

const Inventory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await api.get("/inventory");
    setLogs(res.data);
  };

  return (
    <div>
      <h2>Inventory Logs</h2>

      {logs.map((log: any) => (
        <div key={log._id}>
          {log.type} | {log.change} | {log.productId?.name}
        </div>
      ))}
    </div>
  );
};

export default Inventory;