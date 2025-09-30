import { CartItem } from '@prisma/client';

export interface IGetCart {
  payablePrice: number;
  items: CartItem[];
}
