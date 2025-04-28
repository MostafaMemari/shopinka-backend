export type OrderStatus = "pending" | "paid" | "awaiting-confirmation" | "processing" | "shipped" | "delivered" | "canceled";

export interface IOrder {
  id: string;
  status: OrderStatus;
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  statusDate?: string;
  statusTime?: string;
  products?: { id: string; name: string; image: string; link: string }[];
}
