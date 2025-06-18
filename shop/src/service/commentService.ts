'use server';

import { shopApiFetch } from '@/service/api';
import { CommentFormType, CommentItem, CommentParams, CommentResponse } from '@/types/commentType';
import { ofetch } from 'ofetch';

export const getComments = async (params?: CommentParams): Promise<CommentResponse> => {
  const response = await ofetch(`/comment`, {
    baseURL: process.env.API_BASE_URL,
    method: 'GET',
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });

  return {
    items: response.items,
    pager: response.pager,
  };
};

export const createComment = async (data: CommentFormType): Promise<{ message: string; comment: CommentItem }> => {
  const res = await shopApiFetch('/comment', { method: 'POST', body: { ...data } });

  if (res.status >= 400 || !res.data?.comment) {
    throw new Error(res.data?.message || 'خطا در ایجاد نظر');
  }

  return res.data;
};
