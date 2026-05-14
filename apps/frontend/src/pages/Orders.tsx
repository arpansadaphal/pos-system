import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  ShoppingBag,
  Clock3,
  CheckCircle,
  Receipt,
  Loader2,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<any>(null);

  const [orderItems, setOrderItems] = useState<any[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  const [itemsLoading, setItemsLoading] =
    useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch Orders
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
    } catch (err) {
      console.log(err);

      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Order Items
  const fetchOrderItems = async (
    orderId: string
  ) => {
    setItemsLoading(true);

    try {
      const res = await api.get(
        `/order-items?orderId=${orderId}`
      );

      setOrderItems(res.data);
    } catch (err) {
      console.log(err);

      alert("Failed to load order items");
    } finally {
      setItemsLoading(false);
    }
  };

  // Handle Order Selection
  const handleSelectOrder = (order: any) => {
    setSelectedOrder(order);

    fetchOrderItems(order._id);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" />
          <span className="text-lg font-semibold">
            Loading Orders...
          </span>
        </div>
      </div>
    );
  }

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-gray-500">
        <ShoppingBag size={60} />
        <p className="mt-4 text-xl font-medium">
          No Orders Yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">

      {/* LEFT SIDE - ORDERS */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
        
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="text-blue-600" />
          
          <h2 className="text-2xl font-bold text-gray-800">
            Orders
          </h2>
        </div>

        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o._id}
              onClick={() => handleSelectOrder(o)}
              className={`border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedOrder?._id === o._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h3 className="font-bold text-lg text-gray-800">
                    #{o._id.slice(-6)}
                  </h3>
                </div>

                <div>
                  {o.status === "COMPLETED" ? (
                    <span className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle size={16} />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock3 size={16} />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Amount
                  </p>

                  <h2 className="text-2xl font-bold text-blue-600">
                    ₹{o.totalAmount}
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-sm">
                    Date
                  </p>

                  <p className="font-medium text-gray-700">
                    {new Date(
                      o.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - ORDER DETAILS */}
      <div className="bg-white rounded-2xl shadow-md p-5 h-fit sticky top-4">
        
        <div className="flex items-center gap-3 mb-5">
          <Receipt className="text-purple-600" />

          <h2 className="text-2xl font-bold text-gray-800">
            Order Details
          </h2>
        </div>

        {!selectedOrder ? (
          <div className="text-center py-20 text-gray-500">
            <Receipt size={60} className="mx-auto" />

            <p className="mt-4">
              Select an order to view details
            </p>
          </div>
        ) : (
          <>
            {/* Order Info */}
            <div className="space-y-4 border-b pb-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Order ID
                </p>

                <h3 className="font-semibold break-all">
                  {selectedOrder._id}
                </h3>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total
                  </p>

                  <h2 className="text-2xl font-bold text-blue-600">
                    ₹{selectedOrder.totalAmount}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <p className="font-semibold">
                    {selectedOrder.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Date
                </p>

                <p className="font-medium">
                  {new Date(
                    selectedOrder.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-5">
              
              <h3 className="text-lg font-bold mb-4">
                Items
              </h3>

              {itemsLoading ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Loader2 className="animate-spin" />
                  <span>Loading items...</span>
                </div>
              ) : orderItems.length === 0 ? (
                <p className="text-gray-500">
                  No items found
                </p>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-xl p-4 bg-gray-50"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {item.productId?.name ||
                          "Product"}
                      </h4>

                      <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <p>
                          Quantity:
                          <span className="font-medium ml-1">
                            {item.quantity}
                          </span>
                        </p>

                        <p>
                          Price:
                          <span className="font-medium ml-1">
                            ₹{item.price}
                          </span>
                        </p>

                        <p>
                          Line Total:
                          <span className="font-bold text-green-600 ml-1">
                            ₹
                            {item.quantity *
                              item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;