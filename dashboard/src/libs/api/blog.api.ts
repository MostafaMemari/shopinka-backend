import { Blog } from '@/types/app/blog.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getBlogs = async (params?: Record<string, string>): Promise<Response<Blog[]>> => {
  const res = await serverApiFetch('/blog', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getBlogById = async (id: number): Promise<{ status: number; data: Blog | null }> => {
  const res = await serverApiFetch(`/blog/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

export const updateBlog = async (id: number, data: Partial<Blog>): Promise<{ status: number; data: Blog | null }> => {
  console.log(data)

  const res = await serverApiFetch(`/blog/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createBlog = async (data: Blog): Promise<{ status: number; data: { blog: (Blog & { id: number }) | null } }> => {
  const res = await serverApiFetch('/blog', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const removeBlog = async (id: string): Promise<{ status: number; data: { message: string; blog: Blog } | null }> => {
  const res = await serverApiFetch(`/blog/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
