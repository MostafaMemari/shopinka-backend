export type Image = {
  id: number;
  galleryId: number;
  title: string;
  description: string | null;
  fileUrl: string;
  fileKey: string;
  thumbnailUrl: string;
  thumbnailKey: string;
  mimetype: string;
  size: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
