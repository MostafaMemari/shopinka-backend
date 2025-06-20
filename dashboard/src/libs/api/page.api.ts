import { Page, PageForm } from '@/types/app/page.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getPages = async (params?: Record<string, string>): Promise<Response<Page[]>> => {
  const res = await serverApiFetch('/page', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const updatePage = async (id: string, data: Partial<PageForm>): Promise<{ status: number; data: Page | null }> => {
  const res = await serverApiFetch(`/page/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createPage = async (data: PageForm): Promise<{ status: number; data: Page | null }> => {
  const res = await serverApiFetch('/page', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res,
    status: 201
  }
}

export const removePage = async (id: string): Promise<{ status: number; data: { message: string; page: PageForm } | null }> => {
  const res = await serverApiFetch(`/page/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
