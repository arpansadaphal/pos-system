// import { create } from "zustand";

// interface Item {
//   productId: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartState {
//   items: Item[];
//   addItem: (item: Item) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartState>((set) => ({
//   items: [],

//   addItem: (item) =>
//     set((state) => {
//       const existing = state.items.find(i => i.productId === item.productId);

//       if (existing) {
//         return {
//           items: state.items.map(i =>
//             i.productId === item.productId
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//           ),
//         };
//       }

//       return { items: [...state.items, { ...item, quantity: 1 }] };
//     }),

//   clearCart: () => set({ items: [] }),
// }));


import { create } from "zustand";

interface CartItem {
productId: string;
name: string;
price: number;
quantity: number;
}

interface CartState {
items: CartItem[];

addItem: (item: CartItem) => void;

increaseQuantity: (productId: string) => void;

decreaseQuantity: (productId: string) => void;

removeItem: (productId: string) => void;

clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
items: [],

addItem: (item) =>
set((state) => {
const existing = state.items.find(
(i) => i.productId === item.productId
);

if (existing) {
return {
items: state.items.map((i) =>
i.productId === item.productId
? { ...i, quantity: i.quantity + 1 }
: i
),
};
}

return {
items: [...state.items, item],
};
}),

increaseQuantity: (productId) =>
set((state) => ({
items: state.items.map((item) =>
item.productId === productId
? { ...item, quantity: item.quantity + 1 }
: item
),
})),

decreaseQuantity: (productId) =>
set((state) => ({
items: state.items
.map((item) =>
item.productId === productId
? { ...item, quantity: item.quantity - 1 }
: item
)
.filter((item) => item.quantity > 0),
})),

removeItem: (productId) =>
set((state) => ({
items: state.items.filter(
(item) => item.productId !== productId
),
})),

clearCart: () => set({ items: [] }),
}));
