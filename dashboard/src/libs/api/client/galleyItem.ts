'use client'

import { GalleryItemForm } from '@/types/gallery'
import { serverApiFetch } from '@/utils/api'

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
