'use client';

import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { loginStart, loginFailure, logout } from '@/store/slices/authSlice';

export function useLogoutUser() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    dispatch(loginStart());
    try {
      queryClient.clear();

      dispatch(logout());
    } catch (err) {
      dispatch(loginFailure('Logout failed'));
      console.error('Logout error:', err);
    }
  }, [dispatch, queryClient]);
}
