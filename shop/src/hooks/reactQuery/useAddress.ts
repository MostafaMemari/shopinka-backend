import { QueryOptions } from '@/types/queryOptions';
import { AddressFormType, AddressItem } from '@/types/addressType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { pager } from '@/types/paginationType';
import { createAddress, getAddress, updateAddress, deleteAddress } from '@/service/addressService';

export function useAddress({ enabled = true, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<{
    status: number;
    data: { items: AddressItem[]; pager: pager };
  }>({
    queryKey: [QueryKeys.Address],
    queryFn: getAddress,
    enabled,
    staleTime,
  });

  const createMutation = useMutation({ mutationFn: createAddress });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddressFormType }) => updateAddress(id, data),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
  });

  return {
    data,
    isLoading,
    error,
    refetch,

    createAddress: (data: AddressFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Address] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    updateAddress: (id: number, data: AddressFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      updateMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Address] });
            onSuccess?.();
          },
          onError: (error) => {
            onError?.(error);
          },
        },
      );
    },

    deleteAddress: (id: number, onSuccess?: () => void, onError?: (error: any) => void) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Address] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreateAddressLoading: createMutation.isPending,
    isUpdateAddressLoading: updateMutation.isPending,
    isDeleteAddressLoading: deleteMutation.isPending,
  };
}
