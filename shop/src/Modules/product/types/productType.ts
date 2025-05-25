import { category } from '@/Modules/category/types/categoryType';
import { attribute, attributeValues } from '@/shared/types/attributeType';
import { Image } from '@/shared/types/imageType';
import { SeoMeta } from '@/shared/types/seoMetaType';
import { user } from '@/shared/types/userType';

export type Product = {
  id: number;
  name: string;
  salePrice: string | null;
  basePrice: string | null;
  slug: string;
  mainImage: Image | null;
};

export type productVariant = {
  id: number;
  sku: null;
  mainImageId: number;
  productId: number;
  orderId: number | null;
  userId: 1;
  shortDescription: string | null;
  quantity: number | null;
  basePrice: number | null;
  salePrice: number | null;
  width: number | null;
  height: number | null;
  length: number | null;
  weight: number | null;
  createdAt: string;
  updatedAt: string;
  attributeValues: attributeValues[];
};

export type ProductDetails = {
  id: number;
  sku: string | null;
  name: string;
  mainImageId: number | null;
  userId: number;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  quantity: number | null;
  basePrice: number | null;
  salePrice: number | null;
  status: 'PUBLISHED';
  type: 'SIMPLE' | 'VARIABLE';
  width: number | null;
  height: number | null;
  length: number | null;
  weight: number | null;
  createdAt: string;
  updatedAt: string;
  galleryImages: Image[] | [];
  mainImage: Image | null;
  user: user;
  categories: category[] | [];
  seoMeta: SeoMeta;
  attributes: attribute[] | [];
  variants: productVariant[] | [];
};
