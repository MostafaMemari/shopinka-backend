import { CartItemState } from '../types/cartType';

export const calculateTotals = (
  items: CartItemState[],
): {
  totalPrice: number;
  totalDiscountPrice: number;
  payablePrice: number;
} => {
  const validItems = Array.isArray(items) ? items : [];

  return {
    totalPrice: validItems.reduce((total, item) => total + item?.basePrice * item?.count, 0),

    totalDiscountPrice: validItems.reduce((total, item) => {
      const priceToUse = item?.basePrice - item?.salePrice;
      return total + priceToUse * item?.count;
    }, 0),

    payablePrice: validItems.reduce((total, item) => {
      const priceToPay = item?.salePrice ?? item?.basePrice;
      return total + priceToPay * item?.count;
    }, 0),
  };
};
