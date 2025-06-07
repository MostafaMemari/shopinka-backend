import { QueryOptions } from '@/shared/types/queryOptions';
import { getAddress } from '../services/address.api';
import { AddressItem } from '../types/address.type';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/shared/types/query-keys';
import { pager } from '@/shared/types/paginationType';

export function useAddress({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<{ status: number; data: { items: AddressItem[]; pager: pager } }>({
    queryKey: [QueryKeys.Address],
    queryFn: getAddress,
    enabled: enabled,
    staleTime,
  });
}
