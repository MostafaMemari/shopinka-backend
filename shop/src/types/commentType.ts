export interface CommentFormType {
  title: string;
  content: string;
  isRecommended?: boolean;
  rate?: number;
  productId: number;
  parentId?: number | null;
}

export interface CommentItem {
  id: number;
  title: string;
  content: string;
  isActive: true;
  isRecommended: false;
  rate: number;
  userId: number;
  productId: number;
  blogId: number;
  parentId: number;
  replies?: CommentItem[] | [];
  createdAt: string;
  updatedAt: string;
}
