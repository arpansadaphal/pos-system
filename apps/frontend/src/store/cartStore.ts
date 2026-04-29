import { create } from "zustand";

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Item[];
  addItem: (item: Item) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(i => i.productId === item.productId);

      if (existing) {
        return {
          items: state.items.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  clearCart: () => set({ items: [] }),
}));