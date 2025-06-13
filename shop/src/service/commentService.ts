'use server';

import { shopApiFetch } from '@/server/api';
import { CommentParam } from '@/types/commentParam';
import { CommentFormType, CommentItem } from '@/types/commentType';
import { Pager } from '@/types/pagerType';
import { ofetch } from 'ofetch';

export const getComments = async (params?: CommentParam): Promise<{ items: CommentItem[]; pager: Pager }> => {
  const response = await ofetch(`/comment`, {
    baseURL: process.env.API_BASE_URL,
    method: 'GET',
    query: { ...params },
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
