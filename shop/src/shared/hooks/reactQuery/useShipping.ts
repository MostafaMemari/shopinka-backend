import { QueryOptions } from '@/shared/types/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/shared/types/query-keys';
import { pager } from '@/shared/types/paginationType';
import { getShipping } from '@/shared/services/shipping.api';
import { ShippingItem } from '@/shared/types/shipping.type';

export function useShipping({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<{ status: number; data: { items: ShippingItem[]; pager: pager } }>({
    queryKey: [QueryKeys.Shipping],
    queryFn: getShipping,
    enabled: enabled,
    staleTime,
  });
}
