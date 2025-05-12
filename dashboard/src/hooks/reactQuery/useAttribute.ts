import { getAttributes } from '@/libs/api/productAttributes'
import { useQuery } from '@tanstack/react-query'

interface UseAttributeParams {
  enabled?: boolean
  staleTime?: number
  params?: Record<string, any>
}

export function useAttribute({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: UseAttributeParams) {
  const fetchAttribute = () => getAttributes(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: ['attributes', params],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
