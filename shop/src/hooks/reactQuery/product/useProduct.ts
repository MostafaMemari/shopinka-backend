import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { getProducts, isFavorite } from '@/service/productService';

export function useProducts({
  enabled = true,
  params = {},
  staleTime = 1 * 60 * 1000,
}: {
  enabled?: boolean;
  staleTime?: number;
  params?: Record<string, any>;
  keepPreviousData?: boolean;
}) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Product, params],
    queryFn: () => getProducts(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}

export function useProductFavorite({ productId, isLogin }: { productId: number; isLogin?: boolean }) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.ProductFavorite, productId],
    queryFn: () => isFavorite(productId || 0),
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
