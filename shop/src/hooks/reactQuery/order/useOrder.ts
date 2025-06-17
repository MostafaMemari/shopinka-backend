import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { OrderParams, OrderResponse } from '@/types/orderType';
import { getOrders } from '@/service/orderService';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: OrderParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useOrder({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<OrderResponse, Error>({
    queryKey: [QueryKeys.Orders, params],
    queryFn: () => getOrders({ params }),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
