export type OrderStatus = "pending" | "paid" | "awaiting-confirmation" | "processing" | "shipped" | "delivered";

export interface IOrder {
  id: string;
  status: OrderStatus;
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  statusLabel: string;
  progress: number;
  statusDate?: string;
  statusTime?: string;
}
