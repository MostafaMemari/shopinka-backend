import { getOrders } from '@/libs/api/order.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useOrders({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchOrders = () => getOrders(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Orders, params],
    queryFn: fetchOrders,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
