export interface CartItem {
  id: number;
  type: 'SIMPLE' | 'VARIABLE';
  title: string;
  guarantee: string;
  colorCode?: string | null;
  buttonLabel?: string | null;
  thumbnail: string;
  price: number;
  discount_price: number;
  discount: number;
  count: number;
}
