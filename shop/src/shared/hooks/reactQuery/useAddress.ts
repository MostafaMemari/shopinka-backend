import { QueryOptions } from '@/shared/types/queryOptions';
import { AddressForm, AddressItem } from '../../../modules/address/types/address.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/shared/types/query-keys';
import { pager } from '@/shared/types/paginationType';
import { createAddress, getAddress } from '@/shared/services/address.api';

export function useAddress({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<{ status: number; data: { items: AddressItem[]; pager: pager } }>({
    queryKey: [QueryKeys.Address],
    queryFn: getAddress,
    enabled: enabled,
    staleTime,
  });

  const createAddressMutation = useMutation({
    mutationFn: (data: AddressForm) => createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Address] });
    },
    onError: (error) => {
      console.error('Failed to add to cart via API:', error);
    },
  });

  return {
    addressItems: data?.data.items,
    isLoading,
    error,
    refetch,
    createAddressMutation: (data: AddressForm) => {
      createAddressMutation.mutate(data);
    },
    isCreateAddressLoading: createAddressMutation.isPending,
  };
}
