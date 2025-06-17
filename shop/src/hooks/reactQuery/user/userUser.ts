import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { getMe, updateFullName } from '@/service/user.api';
import { User } from '@/types/userType';

export function useChangeFullName() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: updateFullName });

  return {
    changeFullName: (data: { fullName: string }, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isChangeFullNameLoading: createMutation.isPending,
  };
}

export function useGetMe() {
  return useQuery<{
    status: number;
    data: User | null;
  }>({
    queryKey: [QueryKeys.User],
    queryFn: getMe,
  });
}
