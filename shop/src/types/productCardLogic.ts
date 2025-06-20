export interface ProductCardLogic {
  id: number;
  basePrice: number;
  salePrice: number;
  slug: string;
  mainImageUrl: string | null;
  type: 'VARIABLE' | 'SIMPLE';
  name: string;
}
