import { Category } from './categoryType';
import { Image } from './imageType';
import { Pager } from './pagerType';
import { SeoMeta } from './seoMetaType';
import { User } from './userType';

export interface BlogItem {
  id: number;
  userId: number;
  mainImageId: number;
  slug: string;
  title: string;
  content: string | null;
  status: 'PUBLISHED' | 'DRAFT';
  readingTime: 20;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  tags: string[];
  seoMeta: SeoMeta | null;
  user: User;
  mainImage: Image | undefined;
}

export interface BlogParams {
  page?: number;
  take?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortDirection?: 'desc' | 'asc';
  categoryIds?: number[];
  tagIds?: number[];

  includeCategories?: boolean;
  includeTags?: boolean;
  includeUser?: boolean;
  includeSeoMeta?: boolean;
  includeMainImage?: boolean;
}

export interface BlogResponse {
  pager: Pager;
  items: BlogItem[];
}
