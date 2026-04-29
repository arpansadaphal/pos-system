import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  // const updateQuantity = useCartStore((state) => state.addItem);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      {items.map((item) => (
        <div key={item.productId}>
          {item.name} x {item.quantity}
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
      {/* <button onClick={() => updateQuantity(items[0])}>+</button> */}
    </div>
  );
};

export default Cart;