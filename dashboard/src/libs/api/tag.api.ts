import { Tag, TagForm } from '@/types/app/tag.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getTags = async (params?: Record<string, string>): Promise<Response<Tag[]>> => {
  const res = await serverApiFetch('/tag', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const updateTag = async (id: string, data: Partial<TagForm>): Promise<{ status: number; data: Tag | null }> => {
  const res = await serverApiFetch(`/tag/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createTag = async (data: TagForm): Promise<{ status: number; data: Tag | null }> => {
  const res = await serverApiFetch('/tag', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const removeTag = async (id: string): Promise<{ status: number; data: { message: string; tag: TagForm } | null }> => {
  const res = await serverApiFetch(`/tag/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
