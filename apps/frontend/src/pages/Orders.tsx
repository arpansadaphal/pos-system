// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const Orders = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [orderItems, setOrderItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [itemsLoading, setItemsLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/orders");

//       const sorted = res.data.sort(
//         (a: any, b: any) =>
//           new Date(b.createdAt).getTime() -
//           new Date(a.createdAt).getTime()
//       );

//       setOrders(sorted);
//     } catch (err: any) {
//       console.log(err);
//       alert("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch order items
//   const fetchOrderItems = async (orderId: string) => {
//     setItemsLoading(true);
//     try {
//       const res = await api.get(`/order-items?orderId=${orderId}`);
//       setOrderItems(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load order items");
//     } finally {
//       setItemsLoading(false);
//     }
//   };

//   // ✅ Handle click
//   const handleSelectOrder = (order: any) => {
//     setSelectedOrder(order);
//     fetchOrderItems(order._id);
//   };

//   if (loading) return <p>Loading orders...</p>;
//   if (orders.length === 0) return <p>No orders yet</p>;

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>

//       {/* LEFT: ORDER LIST */}
//       <div style={{ flex: 2 }}>
//         <h2>Orders</h2>

//         {orders.map((o) => (
//           <div
//             key={o._id}
//             onClick={() => handleSelectOrder(o)}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               marginBottom: "10px",
//               cursor: "pointer",
//               background:
//                 selectedOrder?._id === o._id ? "#f0f0f0" : "white",
//             }}
//           >
//             <p><strong>ID:</strong> {o._id.slice(-6)}</p>
//             <p><strong>Amount:</strong> ₹{o.totalAmount}</p>

//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 style={{
//                   color:
//                     o.status === "COMPLETED" ? "green" : "orange",
//                 }}
//               >
//                 {o.status}
//               </span>
//             </p>

//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(o.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT: ORDER DETAILS */}
//       <div
//         style={{
//           flex: 1,
//           borderLeft: "1px solid #ccc",
//           paddingLeft: "10px",
//         }}
//       >
//         <h3>Order Details</h3>

//         {selectedOrder ? (
//           <>
//             <p><strong>ID:</strong> {selectedOrder._id}</p>
//             <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
//             <p><strong>Status:</strong> {selectedOrder.status}</p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedOrder.createdAt).toLocaleString()}
//             </p>

//             <hr />

//             <h4>Items</h4>

//             {itemsLoading ? (
//               <p>Loading items...</p>
//             ) : orderItems.length === 0 ? (
//               <p>No items found</p>
//             ) : (
//               orderItems.map((item) => (
//                 <div
//                   key={item._id}
//                   style={{
//                     borderBottom: "1px solid #ccc",
//                     marginBottom: "8px",
//                     paddingBottom: "5px",
//                   }}
//                 >
//                   <p>
//                     <strong>
//                       {item.productId?.name || "Product"}
//                     </strong>
//                   </p>
//                   <p>Qty: {item.quantity}</p>
//                   <p>Price: ₹{item.price}</p>
//                   <p>
//                     Line Total: ₹{item.quantity * item.price}
//                   </p>
//                 </div>
//               ))
//             )}
//           </>
//         ) : (
//           <p>Select an order to view details</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [orderItems, setOrderItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  // 📦 Fetch orders
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const res = await api.get("/orders");

      const sorted = res.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setOrders(sorted);
      setFilteredOrders(sorted);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // 📦 Fetch items
  const fetchOrderItems = async (orderId: string) => {
    setItemsLoading(true);

    try {
      const res = await api.get(`/order-items?orderId=${orderId}`);

      setOrderItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load order items");
    } finally {
      setItemsLoading(false);
    }
  };

  // 🖱 Select order
  const handleSelectOrder = (order: any) => {
    setSelectedOrder(order);
    fetchOrderItems(order._id);
  };

  // 🔍 Filtering
  useEffect(() => {
    let temp = [...orders];

    // Search by order ID
    if (search) {
      temp = temp.filter((o) =>
        o._id.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by date
    if (dateFilter) {
      temp = temp.filter((o) => {
        const orderDate = new Date(o.createdAt).toISOString().split("T")[0];

        return orderDate === dateFilter;
      });
    }

    setFilteredOrders(temp);
  }, [search, dateFilter, orders]);

  // 💰 Stats
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [filteredOrders]);

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          padding: "20px",
        }}
      >
        Loading orders...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#111827",
        minHeight: "100vh",
        color: "#f9fafb",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
          }}
        >
          Orders Dashboard
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px",
          }}
        >
          View completed sales transactions
        </p>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1f2937",
            padding: "18px",
            borderRadius: "12px",
            minWidth: "220px",
            border: "1px solid #374151",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "10px",
            }}
          >
            Total Orders
          </p>

          <h2>{filteredOrders.length}</h2>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "18px",
            borderRadius: "12px",
            minWidth: "220px",
            border: "1px solid #374151",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "10px",
            }}
          >
            Revenue
          </p>

          <h2 style={{ color: "#10b981" }}>₹{totalRevenue.toFixed(2)}</h2>
        </div>
      </div>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search by order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#1f2937",
            color: "white",
            minWidth: "250px",
          }}
        />

        {/* <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#1f2937",
            color: "white",
          }}
        /> */}

        <button
          onClick={() => {
            setSearch("");
            setDateFilter("");
          }}
          style={{
            background: "#374151",
            border: "none",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* MAIN */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#1f2937",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #374151",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            Orders
          </h2>

          {filteredOrders.length === 0 && (
            <p style={{ color: "#9ca3af" }}>No matching orders found</p>
          )}

          {filteredOrders.map((o) => (
            <div
              key={o._id}
              onClick={() => handleSelectOrder(o)}
              style={{
                background:
                  selectedOrder?._id === o._id ? "#2563eb" : "#111827",

                border:
                  selectedOrder?._id === o._id
                    ? "1px solid #3b82f6"
                    : "1px solid #374151",

                borderRadius: "10px",
                padding: "16px",
                marginBottom: "14px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>#{o._id.slice(-6)}</strong>

                <span
                  style={{
                    background:
                      o.status === "COMPLETED" ? "#065f46" : "#78350f",

                    color: o.status === "COMPLETED" ? "#6ee7b7" : "#fcd34d",

                    padding: "4px 10px",

                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {o.status}
                </span>
              </div>

              <h3
                style={{
                  margin: "8px 0",
                  color: "#10b981",
                }}
              >
                ₹{o.totalAmount}
              </h3>

              <p
                style={{
                  color: "#9ca3af",
                  marginBottom: 0,
                }}
              >
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            background: "#1f2937",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #374151",
            height: "fit-content",
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
            Order Details
          </h2>

          {!selectedOrder ? (
            <p style={{ color: "#9ca3af" }}>Select an order</p>
          ) : (
            <>
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <p>
                  <strong>ID:</strong> {selectedOrder._id}
                </p>

                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>

                <p>
                  <strong>Total:</strong> ₹{selectedOrder.totalAmount}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <hr
                style={{
                  borderColor: "#374151",
                  marginBottom: "20px",
                }}
              />

              <h3>Items</h3>

              {itemsLoading ? (
                <p>Loading items...</p>
              ) : orderItems.length === 0 ? (
                <p>No items found</p>
              ) : (
                orderItems.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      background: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "10px",
                      padding: "14px",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>{item.productId?.name || "Product"}</strong>

                    <p
                      style={{
                        color: "#9ca3af",
                        marginTop: "8px",
                      }}
                    >
                      Qty: {item.quantity}
                    </p>

                    <p
                      style={{
                        color: "#9ca3af",
                      }}
                    >
                      Price: ₹{item.price}
                    </p>

                    <h4
                      style={{
                        color: "#10b981",
                        marginBottom: 0,
                      }}
                    >
                      ₹{item.quantity * item.price}
                    </h4>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
