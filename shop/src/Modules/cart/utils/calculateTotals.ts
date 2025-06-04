import { CartItemState, CartState } from '../types/cartType';

export const calculateTotals = (items: CartItemState[]): Pick<CartState, 'totalPrice' | 'totalDiscountPrice' | 'totalDiscount'> => {
  const validItems = Array.isArray(items) ? items : [];
  return {
    totalPrice: validItems.reduce((total, item) => total + item.basePrice * item.count, 0),
    totalDiscountPrice: validItems.reduce((total, item) => total + item.salePrice * item.count, 0),
    totalDiscount: validItems.reduce((total, item) => total + (item.basePrice - item.salePrice) * item.count, 0), // اصلاح محاسبه تخفیف
  };
};
