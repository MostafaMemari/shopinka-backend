import { BlogItem, BlogParams, BlogResponse } from '@/types/blogType';
import { shopApiFetch } from './api';

export const getBlogs = async (params: BlogParams): Promise<BlogResponse> => {
  const res = await shopApiFetch('/blog', { method: 'GET', query: { ...params, includeMainImage: true } });

  return {
    ...res.data,
  };
};

export const getBlogBySlug = async (slug: string) => {
  const res = await shopApiFetch(`/blog/by-slug/${slug}`, { method: 'GET' });

  return res;
};

export const getBlogById = async (id: string): Promise<BlogItem> => {
  const res = await shopApiFetch(`/blog/${id}`, { method: 'GET' });

  return {
    ...res.data,
  };
};
