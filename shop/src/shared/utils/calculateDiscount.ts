export const calculateDiscount = (oldPrice?: number, newPrice?: number): number => {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) {
    return 0;
  }
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};
