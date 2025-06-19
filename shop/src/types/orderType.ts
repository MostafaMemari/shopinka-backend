import { AddressItem } from './addressType';
import { AttributeValues } from './attributeType';
import { Pager } from './pagerType';
import { Product, ProductVariant } from './productType';
import { ShippingItem } from './shippingType';
import { Transaction } from './transactionType';

export interface Order {
  pager: Pager;
  items: OrderItem[];
}
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  userId: number;
  addressId: number;
  shippingId: number;
  orderNumber: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  address: AddressItem;
  items: OrderProductItem[] | [];
  shippingInfo: null;
  shipping: ShippingItem;
  transaction: Transaction;
}

export interface OrderProductItem {
  id: number;
  orderId: number;
  productId: number;
  productVariantId: null;
  price: number;
  quantity: number;
  createdAt: string;
  product: Product;
  productVariant: ProductVariant | null;
}

export interface OrderResponse {
  pager: Pager;
  items: OrderItem[];
}

export interface orderItemMapped {
  itemId?: number;
  id: number;
  type: 'SIMPLE' | 'VARIABLE';
  title: string;
  thumbnail: string;
  basePrice: number;
  salePrice: number;
  discount: number;
  count: number;
  attributeValues: AttributeValues[];
}

export interface OrderParams {
  page?: number;
  take?: number;
  status?: 'current' | 'delivered' | 'canceled';
}
