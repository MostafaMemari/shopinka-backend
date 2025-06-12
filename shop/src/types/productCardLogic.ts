export interface ProductCardLogic {
  id: number;
  basePrice: number;
  salePrice: number;
  mainImageUrl: string | null;
  type: 'VARIABLE' | 'SIMPLE';
  name: string;
}
