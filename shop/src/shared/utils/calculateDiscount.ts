import { CartItemState, CartState } from '@/Modules/cart/types/cartType';

export const calculateDiscount = (oldPrice?: number | null, newPrice?: number | null): number => {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) {
    return 0;
  }
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};
