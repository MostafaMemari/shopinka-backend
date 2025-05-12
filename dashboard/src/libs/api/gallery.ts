import { Gallery, GalleryForm } from '@/types/gallery'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getGalleries = async (params?: Record<string, string>): Promise<Response<Gallery[]>> => {
  try {
    const res = await serverApiFetch('/gallery', { method: 'GET', query: { ...params } })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { items: [], pager: { totalCount: 0, totalPages: 0, currentPage: 0, hasNextPage: false, hasPreviousPage: false } }
    }
  }
}

export const getGallery = async (id: number): Promise<{ status: number; data: GalleryForm | null }> => {
  try {
    const res = await serverApiFetch(`/gallery/${id}}`, { method: 'DELETE' })

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

export const removeGallery = async (id: string): Promise<{ status: number; data: { message: string; attribute: GalleryForm } | null }> => {
  try {
    const res = await serverApiFetch(`/gallery/${id}`, { method: 'DELETE' })

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

export const updateGallery = async (id: string, data: Partial<GalleryForm>): Promise<{ status: number; data: GalleryForm | null }> => {
  try {
    const res = await serverApiFetch(`/gallery/${id}`, {
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

export const createGallery = async (data: Omit<GalleryForm, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: GalleryForm | null }> => {
  try {
    const res = await serverApiFetch('/gallery', {
      method: 'POST',
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
