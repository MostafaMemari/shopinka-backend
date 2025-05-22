import { CartItem } from '@prisma/client';

export interface IGetCart {
  totalSaved: number;
  finalPrice: number;
  cartItems: CartItem[];
}
