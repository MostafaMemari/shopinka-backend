import { IColor } from './colors';

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  mainImage: {
    fileUrl: string;
  };
  salePrice: number;
  basePrice: number;
  imageSrc: string;
  title: string;
  productLink: string;
  newPrice: number;
  oldPrice?: number;
  discount?: number;
}

export interface IProductDetails {
  title?: string;
  englishTitle?: string;
  sku?: string;
  commentsCount?: number;
  userSuggestion?: string;
  properties?: { [key: string]: string }[];
  colors?: IColor[];
  sizes?: string[];
  price?: number;
  newPrice?: number;
}

export interface IProductThumbnail {
  src: string;
  alt: string;
  isBlurred?: boolean;
}
