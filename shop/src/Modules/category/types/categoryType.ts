export type category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  userId: number;
  thumbnailImageId: number | null;
  createdAt: string;
  updatedAt: string;
};
