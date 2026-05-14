// import { useCartStore } from "../store/cartStore";

// const Cart = () => {
//   const items = useCartStore((state) => state.items);
//   // const updateQuantity = useCartStore((state) => state.addItem);
//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div>
//       <h2>Cart</h2>

//       {items.map((item) => (
//         <div key={item.productId}>
//           {item.name} x {item.quantity}
//         </div>
//       ))}

//       <h3>Total: ₹{total}</h3>
//       {/* <button onClick={() => updateQuantity(items[0])}>+</button> */}
//     </div>
//   );
// };

// export default Cart;


import { useCartStore } from "../store/cartStore";

const Cart = () => {
const items = useCartStore((state) => state.items);

const increaseQuantity = useCartStore(
(state) => state.increaseQuantity
);

const decreaseQuantity = useCartStore(
(state) => state.decreaseQuantity
);

const removeItem = useCartStore(
(state) => state.removeItem
);

return (
<div>
<h2
style={{
marginTop: 0,
marginBottom: "20px",
color: "#ffffff",
}}
>
Cart
</h2>

{items.length === 0 && (
<p style={{ color: "#9ca3af" }}>
No items added
</p>
)}

{items.map((item) => (
<div
key={item.productId}
style={{
borderBottom: "1px solid #374151",
paddingBottom: "15px",
marginBottom: "15px",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
}}
>
<strong>{item.name}</strong>

<button
onClick={() =>
removeItem(item.productId)
}
style={{
background: "transparent",
border: "none",
color: "#ef4444",
cursor: "pointer",
}}
>
✕
</button>
</div>

<p style={{ color: "#9ca3af" }}>
₹{item.price}
</p>

<div
style={{
display: "flex",
alignItems: "center",
gap: "10px",
}}
>
<button
onClick={() =>
decreaseQuantity(item.productId)
}
style={{
width: "30px",
height: "30px",
borderRadius: "6px",
border: "none",
background: "#374151",
color: "white",
cursor: "pointer",
}}
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={() =>
increaseQuantity(item.productId)
}
style={{
width: "30px",
height: "30px",
borderRadius: "6px",
border: "none",
background: "#2563eb",
color: "white",
cursor: "pointer",
}}
>
+
</button>
</div>

<p
style={{
marginTop: "10px",
color: "#10b981",
fontWeight: 700,
}}
>
₹
{(item.price * item.quantity).toFixed(2)}
</p>
</div>
))}
</div>
);
};

export default Cart;