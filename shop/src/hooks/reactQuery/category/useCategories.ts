import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/service/categoryService';
import { QueryKeys } from '@/shared/types/query-keys';
import { QueryOptions } from '@/shared/types/queryOptions';

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getCategories(params).then((res) => res);

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
