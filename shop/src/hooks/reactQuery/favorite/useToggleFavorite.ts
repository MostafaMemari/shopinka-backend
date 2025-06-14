import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { favoriteToggle } from '@/service/productService';

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: favoriteToggle });

  return {
    favoriteToggle: (productId: number, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(productId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Favorites] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isToggleFavoriteLoading: createMutation.isPending,
  };
}
