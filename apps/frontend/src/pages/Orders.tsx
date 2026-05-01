import { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");

      const sorted = res.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setOrders(sorted);
    } catch (err: any) {
      console.log(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch order items
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

  // ✅ Handle click
  const handleSelectOrder = (order: any) => {
    setSelectedOrder(order);
    fetchOrderItems(order._id);
  };

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders yet</p>;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* LEFT: ORDER LIST */}
      <div style={{ flex: 2 }}>
        <h2>Orders</h2>

        {orders.map((o) => (
          <div
            key={o._id}
            onClick={() => handleSelectOrder(o)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              background:
                selectedOrder?._id === o._id ? "#f0f0f0" : "white",
            }}
          >
            <p><strong>ID:</strong> {o._id.slice(-6)}</p>
            <p><strong>Amount:</strong> ₹{o.totalAmount}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    o.status === "COMPLETED" ? "green" : "orange",
                }}
              >
                {o.status}
              </span>
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(o.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT: ORDER DETAILS */}
      <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          paddingLeft: "10px",
        }}
      >
        <h3>Order Details</h3>

        {selectedOrder ? (
          <>
            <p><strong>ID:</strong> {selectedOrder._id}</p>
            <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <hr />

            <h4>Items</h4>

            {itemsLoading ? (
              <p>Loading items...</p>
            ) : orderItems.length === 0 ? (
              <p>No items found</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginBottom: "8px",
                    paddingBottom: "5px",
                  }}
                >
                  <p>
                    <strong>
                      {item.productId?.name || "Product"}
                    </strong>
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>
                    Line Total: ₹{item.quantity * item.price}
                  </p>
                </div>
              ))
            )}
          </>
        ) : (
          <p>Select an order to view details</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
