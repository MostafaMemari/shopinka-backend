export interface Comment {
  title: string;
  content: string;
  isRecommended: boolean;
  rate: number;
  productId: number;
  parentId: number | null;
}

export interface CommentItem {
  id: number;
  title: string;
  content: string;
  isActive: true;
  isRecommended: false;
  rate: number;
  userId: number;
  productId: number | null;
  blogId: number | null;
  parentId: number | null;
  replies?: CommentItem[] | [];
  createdAt: string;
  updatedAt: string;
}
