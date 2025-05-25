export type SeoMeta = {
  id: number | null;
  userId: number | null;
  ogImageId: number | null;
  productId: number | null;
  blogId: number | null;
  tagId: number | null;
  categoryId: number | null;
  entityType: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | [];
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  robotsTag: string | null;
  createdAt: string;
  updatedAt: string;
};
