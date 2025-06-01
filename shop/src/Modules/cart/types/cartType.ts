import { AttributeValues } from '@/shared/types/attributeType';

export interface CartItem {
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
