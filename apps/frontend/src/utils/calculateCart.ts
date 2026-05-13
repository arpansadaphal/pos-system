export const calculateCart = (items: any[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const TAX_RATE = 0.05;
  const tax = subtotal * TAX_RATE;

  const total = subtotal + tax;

  return { subtotal, tax, total };
};