'use client'

import { getGalleries } from '@/libs/api/gallery.api'
import { getGalleryItems } from '@/libs/api/galleyItem.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useGalleryItems({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGalleryItems = () => getGalleryItems(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.GalleryItems, params],
    queryFn: fetchGalleryItems,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useGallery({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGallery = () => getGalleries(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Galleries, params],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
