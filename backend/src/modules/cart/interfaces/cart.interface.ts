import { CartItem } from 'generated/prisma';

export interface IGetCart {
  totalSaved: number;
  finalPrice: number;
  cartItems: CartItem[];
}
