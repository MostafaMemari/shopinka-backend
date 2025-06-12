export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  userId: number;
  thumbnailImageId: number | null;
  createdAt: string;
  updatedAt: string;
  children: Category[];
};

export type CategoryParams = {
  name?: string;
  slug?: string;
  description?: string;
  childrenDepth?: number;
  includeUser?: boolean;
  includeBlogs?: boolean;
  includeProducts?: boolean;
  includeThumbnailImage?: boolean;
  includeParent?: boolean;
  includeSeoMeta?: boolean;
  includeChildren?: boolean;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortDirection?: 'desc' | 'asc';
};
