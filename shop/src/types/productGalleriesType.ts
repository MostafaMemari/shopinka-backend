import { Image } from '@/shared/types/imageType';

export interface ProductGalleriesType {
  type: string | null;
  mainImage: Image | null;
  galleryImages: Image[] | [];
  name: string;
}
