import { getAttributes } from '@/libs/api/productAttributes.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useAttribute({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchAttribute = () => getAttributes(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Attributes, params],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
