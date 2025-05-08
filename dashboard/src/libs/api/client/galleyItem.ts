'use client'

import { clientApiFetch } from '@/libs/clientApiFetch'
import { GalleryItemForm } from '@/types/gallery'

export const getGalleryItemClient = async (id: number): Promise<{ status: number; data: GalleryItemForm | null }> => {
  try {
    const res = await clientApiFetch(`/gallery-item/${id}}`, { method: 'GET' })

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
