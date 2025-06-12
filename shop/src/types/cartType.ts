import { AttributeValues } from '@/shared/types/attributeType';

export interface CartItemState {
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

export interface CartState {
  items: CartItemState[];
  totalPrice: number;
  totalDiscountPrice: number;
  totalDiscount: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number | null;
  productVariantId: number | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    salePrice: number | null;
    basePrice: number | null;
    type: 'SIMPLE' | 'VARIABLE';
    mainImage: { fileUrl: string | null } | null;
  } | null;
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
export interface CartResponse {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  items: CartItemState[];
}

export interface CartData {
  productId: number | null | undefined;
  productVariantId: number | null | undefined;
  quantity: number;
}
