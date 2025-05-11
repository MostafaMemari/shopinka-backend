import { getCategories } from '@/libs/api/category'
import { useQuery } from '@tanstack/react-query'

interface UseCategoryParams {
  enabled?: boolean
  search?: string
  staleTime?: number
}

export function useCategories({ enabled = true, search = '', staleTime = 1 * 60 * 1000 }: UseCategoryParams) {
  const fetchCategory = () => getCategories().then(res => res)

  return useQuery<any, Error>({
    queryKey: ['categories', search],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
