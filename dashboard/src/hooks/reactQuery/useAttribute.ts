import { getAttributes } from '@/libs/api/productAttributes'
import { useQuery } from '@tanstack/react-query'

interface UseAttributeParams {
  enabled?: boolean
  staleTime?: number
}

export function useAttribute({ enabled = true, staleTime = 1 * 60 * 1000 }: UseAttributeParams) {
  const fetchAttribute = () => getAttributes().then(res => res)

  return useQuery<any, Error>({
    queryKey: ['attributes'],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
