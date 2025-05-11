import { GalleryItem, GalleryItemForm } from '@/types/gallery'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getItemGalleries = async (params?: Record<string, string>): Promise<Response<GalleryItem[]>> => {
  try {
    const res = await serverApiFetch('/gallery-item', {
      method: 'GET',
      query: { ...params }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message?.includes('401') ? 401 : 500,
      data: {
        items: [],
        pager: {
          totalCount: 0,
          totalPages: 0,
          currentPage: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  }
}

export const getGalleryItemById = async (id: number): Promise<{ status: number; data: GalleryItemForm | null }> => {
  try {
    const res = await serverApiFetch(`/gallery-item/${id}}`, { method: 'GET' })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const getGalleryItems = async (params: Record<string, string>): Promise<{ status: number; data: GalleryItemForm | null }> => {
  try {
    const res = await serverApiFetch(`/gallery-item`, { method: 'GET', query: { ...params } })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const removeGalleryItem = async (
  galleryItemIds: string[],
  isForce: boolean = true
): Promise<{ status: number; data: { message: string; attribute: GalleryItemForm } | null }> => {
  try {
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
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: error.message
    }
  }
}

export const updateGalleryItem = async (id: string, data: Partial<GalleryItemForm>): Promise<{ status: number; data: GalleryItemForm | null }> => {
  try {
    const res = await serverApiFetch(`/gallery-item/${id}`, {
      method: 'PATCH',
      body: { ...data }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const createGalleryItem = async (formData: FormData): Promise<{ status: number; data: GalleryItemForm | null }> => {
  try {
    const res = await serverApiFetch('/gallery-item', {
      method: 'POST',
      body: formData
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}
