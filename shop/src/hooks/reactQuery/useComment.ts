import { QueryOptions } from '@/types/queryOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentFormType } from '@/types/commentType';
import { createComment, getComments } from '@/service/commentService';

export function useComment({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<any, Error>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: () => getComments(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({ mutationFn: createComment });

  return {
    data,
    isLoading,
    error,
    refetch,

    createComment: (data: CommentFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Comments] });
          onSuccess?.();
        },
        onError: (error) => {
          console.error('خطا در افزودن نظر:', error);
          onError?.(error);
        },
      });
    },

    isCreateCommentLoading: createMutation.isPending,
  };
}
