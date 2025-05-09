'use client'

import { getGalleries } from '@/libs/api/gallery'
import { getGalleryItems } from '@/libs/api/galleyItem'
import { useQuery } from '@tanstack/react-query'

interface UseGalleryItemsParams {
  enabled?: boolean
  search?: string
  galleryId?: string
  staleTime?: number
}

export function useGalleryItems({ enabled = true, search = '', galleryId, staleTime = 5 * 60 * 1000 }: UseGalleryItemsParams) {
  const fetchGallery = () => getGalleryItems().then(res => res)

  return useQuery<any, Error>({
    queryKey: ['gallery-items', galleryId, search],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseGalleryParams {
  enabled?: boolean
  search?: string
  staleTime?: number
}

export function useGallery({ enabled = true, search = '', staleTime = 5 * 60 * 1000 }: UseGalleryParams) {
  const fetchGallery = () => getGalleries().then(res => res)

  return useQuery<any, Error>({
    queryKey: ['galleries', search],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
