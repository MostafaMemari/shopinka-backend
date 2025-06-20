import { Image } from './imageType';
import { Pager } from './pagerType';

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

  mainImage: Image | undefined;
}

export interface BlogParams {
  page?: number;
  take?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortDirection?: 'desc' | 'asc';

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
