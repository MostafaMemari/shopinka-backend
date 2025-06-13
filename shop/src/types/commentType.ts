import { Pager } from './pagerType';

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
  replies: CommentItem[] | [];
  createdAt: string;
  updatedAt: string;
}

export interface CommentParams {
  page?: number;
  take?: number;
  isRecommended?: boolean;
  repliesDepth?: number;
  blogId?: number;
  productId?: number;
  includeUser?: boolean;
  includeReplies?: boolean;
}
export interface CommentResponse {
  items: CommentItem[];
  pager: Pager;
}
