import { getProducts } from '@/libs/api/product.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getProducts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Products, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
