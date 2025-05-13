import { getCategories } from '@/libs/api/category'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getCategories(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
