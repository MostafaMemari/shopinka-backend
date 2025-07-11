import { CartItem } from '@prisma/client';

export interface IGetCart {
  totalSaved: number;
  payablePrice: number;
  items: CartItem[];
}

export interface CartItemInput {
  quantity: number;
  product?: {
    basePrice: number;
    salePrice: number;
  };
  productVariant?: {
    basePrice: number;
    salePrice: number;
  };
}

export interface CartTotals {
  totalPrice: number;
  totalDiscountPrice: number;
  payablePrice: number;
}
