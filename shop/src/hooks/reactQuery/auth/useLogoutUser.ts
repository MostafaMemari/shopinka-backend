import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { loginStart, loginFailure, logout } from '@/store/slices/authSlice';
import { QueryKeys } from '@/types/query-keys';

export function useLogoutUser() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    dispatch(loginStart());
    try {
      queryClient.removeQueries({ queryKey: [QueryKeys.User] });
      queryClient.removeQueries({ queryKey: [QueryKeys.Cart] });
      dispatch(logout());
    } catch (err) {
      dispatch(loginFailure('Logout failed'));
      console.error('Logout error:', err);
    }
  }, [dispatch, queryClient]);
}
