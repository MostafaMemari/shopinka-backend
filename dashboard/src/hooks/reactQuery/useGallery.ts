'use client'

import { getGalleries } from '@/libs/api/gallery'
import { getGalleryItems } from '@/libs/api/galleyItem'
import { useQuery } from '@tanstack/react-query'

interface UseGalleryItemsParams {
  enabled?: boolean
  params?: Record<string, any>
  staleTime?: number
}

export function useGalleryItems({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: UseGalleryItemsParams) {
  const fetchGalleryItems = () => getGalleryItems(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: ['gallery-items', params],
    queryFn: fetchGalleryItems,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseGalleryParams {
  enabled?: boolean
  staleTime?: number
  params?: Record<string, any>
}

export function useGallery({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: UseGalleryParams) {
  const fetchGallery = () => getGalleries(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: ['galleries', params],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
