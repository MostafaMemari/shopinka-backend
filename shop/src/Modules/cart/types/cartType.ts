import { Product, ProductVariant } from '@/Modules/product/types/productType';
import { AttributeValues } from '@/shared/types/attributeType';

export interface CartItemState {
  id: number;
  type: 'SIMPLE' | 'VARIABLE';
  title: string;
  thumbnail: string;
  price: number;
  discount_price: number;
  discount: number;
  count: number;
  attributeValues: AttributeValues[];
}
export interface CartItem {
  id: number;
  cartId: number;
  productId: number | null;
  productVariantId: number | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product | null;
  productVariant: ProductVariant | null;
}
export interface Cart {
  finalPrice: number;
  totalSaved: number;
  cartItems: CartItem[];
}

export interface CartData {
  productId: number | null;
  productVariantId: number | null;
  quantity: number;
}
