import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentParams, CommentResponse } from '@/types/commentType';
import { getComments } from '@/service/commentService';

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
  const { data, isLoading, error, refetch, isFetching } = useQuery<CommentResponse, Error>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: () => getComments(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
