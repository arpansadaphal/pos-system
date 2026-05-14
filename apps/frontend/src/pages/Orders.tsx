import { useEffect, useState } from "react";

import api from "../api/axios";

import {
  ShoppingCart,
  BadgeCheck,
  Clock,
  ReceiptText,
  LoaderCircle,
  Package2,
  CalendarDays,
  IndianRupee,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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

  // FETCH ORDERS
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

  // FETCH ITEMS
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

      alert("Failed to load items");
    } finally {
      setItemsLoading(false);
    }
  };

  // HANDLE SELECT
  const handleSelectOrder = (order: any) => {
    setSelectedOrder(order);

    fetchOrderItems(order._id);
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl">

        <div className="text-center">

          <LoaderCircle
            size={60}
            className="animate-spin text-blue-600 mx-auto"
          />

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            Loading Orders
          </h2>

          <p className="text-gray-500 mt-2">
            Fetching latest transactions...
          </p>
        </div>
      </div>
    );
  }

  // EMPTY UI
  if (orders.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl">

        <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
          
          <ShoppingCart
            size={55}
            className="text-blue-600"
          />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          No Orders Available
        </h1>

        <p className="mt-3 text-gray-500 max-w-md">
          Orders will appear here once customers
          start placing purchases.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6 rounded-3xl">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">
            Order Management
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor transactions and customer orders
          </p>
        </div>

        {/* TOTAL ORDERS CARD */}
        <div className="mt-5 md:mt-0 bg-white shadow-xl rounded-3xl px-6 py-4 flex items-center gap-4 border border-gray-100">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            
            <ReceiptText
              className="text-blue-600"
              size={28}
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {orders.length}
            </h2>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ORDERS LIST */}
        <div className="xl:col-span-2 space-y-5">

          {orders.map((o) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              key={o._id}
              onClick={() => handleSelectOrder(o)}
              className={`cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 ${
                selectedOrder?._id === o._id
                  ? "border-blue-500 shadow-2xl bg-white"
                  : "border-transparent bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl"
              }`}
            >

              {/* TOP STRIP */}
              <div
                className={`h-2 ${
                  o.status === "COMPLETED"
                    ? "bg-green-500"
                    : "bg-yellow-400"
                }`}
              ></div>

              <div className="p-6">

                {/* HEADER */}
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-gray-400 text-sm">
                      Order Number
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800">
                      #{o._id.slice(-6)}
                    </h2>
                  </div>

                  {/* STATUS */}
                  {o.status === "COMPLETED" ? (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                      
                      <BadgeCheck size={18} />

                      Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
                      
                      <Clock size={18} />

                      Pending
                    </div>
                  )}
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-6">

                  {/* TOTAL */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <div className="flex items-center gap-2 text-blue-600">
                      
                      <IndianRupee size={18} />

                      <span className="text-sm font-medium">
                        Total
                      </span>
                    </div>

                    <h3 className="mt-2 text-2xl font-bold text-gray-800">
                      ₹{o.totalAmount}
                    </h3>
                  </div>

                  {/* DATE */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <div className="flex items-center gap-2 text-purple-600">
                      
                      <CalendarDays size={18} />

                      <span className="text-sm font-medium">
                        Date
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-gray-700">
                      {new Date(
                        o.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* ITEMS */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <div className="flex items-center gap-2 text-pink-600">
                      
                      <Package2 size={18} />

                      <span className="text-sm font-medium">
                        Status
                      </span>
                    </div>

                    <p className="mt-2 font-bold text-gray-700">
                      {o.status}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ORDER DETAILS */}
        <div className="sticky top-6 h-fit">

          <AnimatePresence mode="wait">

            {!selectedOrder ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center"
              >

                <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                  
                  <Sparkles
                    size={40}
                    className="text-blue-600"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-gray-800">
                  Select an Order
                </h2>

                <p className="mt-3 text-gray-500">
                  Click any order card to see full
                  details and purchased items.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedOrder._id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
              >

                {/* HEADER */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

                  <p className="text-blue-100 text-sm">
                    Selected Order
                  </p>

                  <h1 className="text-3xl font-black mt-2">
                    #{selectedOrder._id.slice(-6)}
                  </h1>

                  <p className="mt-3 text-blue-100">
                    ₹{selectedOrder.totalAmount}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="p-6">

                  <h2 className="text-xl font-bold text-gray-800 mb-5">
                    Purchased Items
                  </h2>

                  {itemsLoading ? (
                    <div className="flex items-center gap-3 text-blue-600">
                      
                      <LoaderCircle className="animate-spin" />

                      Loading items...
                    </div>
                  ) : (
                    <div className="space-y-4">

                      {orderItems.map((item) => (
                        <div
                          key={item._id}
                          className="bg-slate-50 rounded-2xl p-5 border border-gray-100"
                        >

                          <div className="flex justify-between items-start">

                            <div>
                              <h3 className="font-bold text-gray-800">
                                {item.productId?.name ||
                                  "Product"}
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            <div className="text-right">

                              <p className="text-sm text-gray-500">
                                Price
                              </p>

                              <h3 className="font-bold text-blue-600">
                                ₹{item.price}
                              </h3>
                            </div>
                          </div>

                          {/* TOTAL */}
                          <div className="mt-4 flex justify-between items-center border-t pt-3">

                            <span className="text-gray-500 text-sm">
                              Line Total
                            </span>

                            <span className="text-lg font-black text-green-600">
                              ₹
                              {item.quantity *
                                item.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Orders;