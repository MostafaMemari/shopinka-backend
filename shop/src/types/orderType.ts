import { AddressItem } from './address.type';
import { AttributeValues } from './attributeType';
import { Pager } from './pagerType';
import { ShippingItem } from './shipping.type';

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
}

export interface OrderProductItem {
  id: number;
  orderId: number;
  productId: number;
  productVariantId: number | null;
  price: number;
  quantity: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    salePrice: number | null;
    basePrice: number | null;
    slug: string;
    type: 'SIMPLE' | 'VARIABLE';
    mainImage: { fileUrl: string | null } | null;
  };
  productVariant: {
    id: number;
    salePrice: number;
    basePrice: number;
    product: {
      name: string;
      mainImage: { fileUrl: string } | null;
      type: 'SIMPLE' | 'VARIABLE';
    };
    attributeValues: AttributeValues[] | [];
  } | null;
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
