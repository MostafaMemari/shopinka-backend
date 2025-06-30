import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { useSyncCart } from '../cart/useSyncCart';
import { UserState } from '@/types/userType';

export function useLoginUser() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const syncCart = useSyncCart();

  return useCallback(
    async (userData: UserState) => {
      dispatch(loginStart());
      try {
        dispatch(loginSuccess(userData));
        await syncCart();
        queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
      } catch (err) {
        dispatch(loginFailure('Login failed'));
        console.error('Login error:', err);
      }
    },
    [dispatch, queryClient, syncCart],
  );
}
