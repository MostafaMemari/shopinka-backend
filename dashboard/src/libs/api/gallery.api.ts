import { Gallery, GalleryForm } from '@/types/app/gallery.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getGalleries = async (params?: Record<string, string>): Promise<Response<Gallery[]>> => {
  const res = await serverApiFetch('/gallery', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getGallery = async (id: number): Promise<{ status: number; data: GalleryForm | null }> => {
  const res = await serverApiFetch(`/gallery/${id}}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const removeGallery = async (id: string): Promise<{ status: number; data: { message: string; attribute: GalleryForm } | null }> => {
  const res = await serverApiFetch(`/gallery/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateGallery = async (id: string, data: Partial<GalleryForm>): Promise<{ status: number; data: GalleryForm | null }> => {
  const res = await serverApiFetch(`/gallery/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createGallery = async (data: Omit<GalleryForm, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: GalleryForm | null }> => {
  const res = await serverApiFetch('/gallery', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
