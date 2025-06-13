import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentFormType, CommentParams, CommentResponse } from '@/types/commentType';
import { createComment, getComments } from '@/service/commentService';

export function useCreateComment() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: createComment });

  return {
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
