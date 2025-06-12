import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { QueryOptions } from '@/types/queryOptions';
import { getProducts } from '@/service/productService';

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Product, params],
    queryFn: () => getProducts(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
