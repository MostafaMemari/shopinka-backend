'use client'

import { getGalleryItems } from '@/libs/api/galleyItem'
import { useQuery } from '@tanstack/react-query'

export function useGallery(params: any) {
  const fetchGallery = () => getGalleryItems().then(res => res)

  return useQuery<any, Error>({
    queryKey: ['gallery', params],
    queryFn: fetchGallery,
    enabled: true,
    refetchOnWindowFocus: false
  })
}
