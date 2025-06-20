import { BlogParams, BlogResponse } from '@/types/blogType';
import { shopApiFetch } from './api';

export const getBlogs = async (params: BlogParams): Promise<BlogResponse> => {
  const res = await shopApiFetch('/blog', { method: 'GET', query: { ...params, includeMainImage: true } });

  return {
    ...res.data,
  };
};
