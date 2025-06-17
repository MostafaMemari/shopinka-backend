export enum OrderSortBy {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  TotalPrice = 'totalPrice',
  Quantity = 'quantity',
}

export enum QueryOrderStatus {
  CURRENT = 'current',
  DELIVERED = 'delivered',
  CANCELLED = 'canceled',
}
