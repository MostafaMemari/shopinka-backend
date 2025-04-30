import { Product } from "../../product/types/type";
import { TransactionType } from "./enym";

export type Transaction = {
  id: number;
  price: number | null;
  quantity: number;
  type: TransactionType;
  userId: number;
  productId: number;
  created_at: string | Date;
  product: Product;
};
