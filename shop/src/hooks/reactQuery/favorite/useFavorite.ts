import { getFavorites } from '@/service/user.api';
import { FavoriteResponse } from '@/types/favoriteType';
import { QueryKeys } from '@/types/query-keys';
import { useQuery } from '@tanstack/react-query';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: { page: number; take: number };
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useFavorite({
  enabled = true,
  params = { page: 1, take: 10 },
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<FavoriteResponse, Error>({
    queryKey: [QueryKeys.Favorites, params],
    queryFn: () => getFavorites(params),
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
