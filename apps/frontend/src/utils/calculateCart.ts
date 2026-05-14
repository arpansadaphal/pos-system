interface CartItem {
  price: number;
  quantity: number;
}

interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const TAX_RATE = 0.05;

export const calculateCart = (
  items: CartItem[]
): CartSummary => {

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Total quantity of items
  const itemCount = items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Tax calculation
  const tax = subtotal * TAX_RATE;

  // Final total
  const total = subtotal + tax;

  // Rounded values
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount,
  };
};