import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentFormType, CommentParams, CommentResponse } from '@/types/commentType';
import { createComment, getComments } from '@/service/commentService';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: CommentParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useComment({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isFetching } = useQuery<CommentResponse, Error>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: () => getComments(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  const createMutation = useMutation({ mutationFn: createComment });

  return {
    data,
    isLoading,
    error,
    isFetching,
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
