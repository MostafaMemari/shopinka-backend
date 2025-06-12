import { Attribute, AttributeValues } from '@/shared/types/attributeType';
import { Category } from '@/types/categoryType';
import { Image } from '@/shared/types/imageType';
import { SeoMeta } from '@/shared/types/seoMetaType';
import { user } from '@/shared/types/userType';

export type Product = {
  id: number;
  name: string;
  salePrice: number | null;
  basePrice: number | null;
  slug: string;
  mainImage: Image | null;
  type: 'SIMPLE' | 'VARIABLE';
  quantity: number | null;
};

export type ProductParams = {
  page?: number;
  take?: number;
  hasDiscount?: boolean;
  categoryIds?: number[];
  attributeValueIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  stockStatus?: 'all' | 'instock';
  search?: string;
  includeMainImage?: boolean;
  includeVariants?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
};

export interface ProductVariant {
  id: number;
  sku: string | null;
  mainImageId: number | null;
  productId: number;
  orderId: number;
  userId: number;
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
  attributeValues: AttributeValues[];
  mainImage: Image | null;
}

export interface ProductDetails {
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
  defaultVariantId: number | null;
  createdAt: string;
  updatedAt: string;
  galleryImages: Image[] | [];
  mainImage: Image | null;
  user: user;
  categories: Category[] | [];
  seoMeta: SeoMeta;
  attributes: Attribute[] | [];
  variants: ProductVariant[] | [];
}
