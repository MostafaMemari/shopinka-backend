import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { QueryOptions } from '@/types/queryOptions';
import { getComments } from '@/service/commentService';

export function useComments({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  console.log(params);
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: () => getComments(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
