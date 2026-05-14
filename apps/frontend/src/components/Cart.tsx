import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4 mb-5">
          <ShoppingCart className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">
            Shopping Cart
          </h2>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              Your cart is empty 🛒
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="border-t mt-6 pt-5 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                Total
              </h3>

              <span className="text-2xl font-bold text-blue-600">
                ₹{total}
              </span>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;