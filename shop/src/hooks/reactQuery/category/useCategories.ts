import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/service/categoryService';
import { QueryKeys } from '@/types/query-keys';
import { QueryOptions } from '@/types/queryOptions';

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: () => getCategories(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
