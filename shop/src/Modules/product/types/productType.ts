import { Image } from '@/shared/types/imageType';

export type Product = {
  id: number;
  name: string;
  salePrice: string | null;
  basePrice: string | null;
  slug: string;
  mainImage: Image;
};
