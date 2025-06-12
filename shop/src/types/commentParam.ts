export interface CommentParam {
  page?: number;
  take?: number;
  isRecommended?: boolean;
  repliesDepth?: number;
  blogId?: number;
  productId?: number;
  includeUser?: boolean;
  includeReplies?: boolean;
}
