import { CartItemState } from '@/types/cartType';

export const calculateTotals = (
  items: CartItemState[],
): {
  totalPrice: number;
  totalDiscountPrice: number;
  payablePrice: number;
} => {
  const validItems = Array.isArray(items) ? items : [];

  const totalPrice = validItems.reduce((total, item) => total + (item.basePrice || 0) * (item.count || 0), 0);

  const payablePrice = validItems.reduce((total, item) => {
    const price = item.salePrice && item.salePrice > 0 ? item.salePrice : item.basePrice || 0;
    return total + price * (item.count || 0);
  }, 0);

  const totalDiscountPrice = totalPrice - payablePrice;

  return {
    totalPrice,
    totalDiscountPrice,
    payablePrice,
  };
};
