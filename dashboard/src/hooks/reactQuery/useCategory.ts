import { getCategories } from '@/libs/api/category'
import { useQuery } from '@tanstack/react-query'

interface UseCategoryParams {
  enabled?: boolean
  search?: string
  staleTime?: number
  params?: Record<string, any>
}

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: UseCategoryParams) {
  const fetchCategory = () => getCategories(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: ['categories', params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
