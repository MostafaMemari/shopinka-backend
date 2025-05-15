import { getComments } from '@/libs/api/comment.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useComments({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getComments(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
