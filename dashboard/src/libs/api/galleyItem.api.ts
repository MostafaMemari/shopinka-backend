import { GalleryItem, GalleryItemForm } from '@/types/app/gallery.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getItemGalleries = async (params?: Record<string, string>): Promise<Response<GalleryItem[]>> => {
  const res = await serverApiFetch('/gallery-item', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getGalleryItemById = async (id: number): Promise<{ status: number; data: GalleryItemForm | null }> => {
  const res = await serverApiFetch(`/gallery-item/${id}}`, { method: 'GET' })

  return {
    ...res
  }
}

export const getGalleryItems = async (params: Record<string, string>): Promise<{ status: number; data: GalleryItemForm | null }> => {
  const res = await serverApiFetch(`/gallery-item`, { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const removeGalleryItem = async (
  galleryItemIds: string[],
  isForce: boolean = true
): Promise<{ status: number; data: { message: string; attribute: GalleryItemForm } | null }> => {
  const res = await serverApiFetch(`/gallery-item/`, {
    method: 'DELETE',
    body: {
      galleryItemIds,
      isForce
    }
  })

  return {
    ...res
  }
}

export const updateGalleryItem = async (id: string, data: Partial<GalleryItemForm>): Promise<{ status: number; data: GalleryItemForm | null }> => {
  const res = await serverApiFetch(`/gallery-item/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createGalleryItem = async (formData: FormData): Promise<{ status: number; data: GalleryItemForm | null }> => {
  const res = await serverApiFetch('/gallery-item', {
    method: 'POST',
    body: formData
  })

  return {
    ...res
  }
}
