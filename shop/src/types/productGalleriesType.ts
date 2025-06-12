import { Image } from '@/types/imageType';

export interface ProductGalleriesType {
  type: string | null;
  mainImage: Image | null;
  galleryImages: Image[] | [];
  name: string;
}
