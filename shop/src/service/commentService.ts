import { CommentParam } from '@/types/commentParam';
import { CommentItem } from '@/types/commentType';
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
