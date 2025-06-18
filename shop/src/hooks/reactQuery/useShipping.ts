import { QueryOptions } from '@/types/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { pager } from '@/types/paginationType';
import { getShipping } from '@/service/shippingService';
import { ShippingItem } from '@/types/shippingType';

export function useShipping({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<{ status: number; data: { items: ShippingItem[]; pager: pager } }>({
    queryKey: [QueryKeys.Shipping],
    queryFn: getShipping,
    enabled: enabled,
    staleTime,
  });
}
