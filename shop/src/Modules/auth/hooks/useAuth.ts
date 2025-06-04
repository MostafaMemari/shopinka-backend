import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { loginStart, loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';
import { User, UserState } from '@/Modules/auth/types/userType';
import { getMe } from '../services/user.api';
import { logout as logoutApi } from '../services/auth.api';
import { clearCartAction } from '@/store/slices/cartSlice';
import { QueryKeys } from '@/shared/types/query-keys';
import { useSyncCart } from '@/Modules/cart/hooks/useSyncCart';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isLogin, user, isLoading, error } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { syncCart } = useSyncCart();

  const checkAuth = useCallback(async () => {
    dispatch(loginStart());
    try {
      let userData = queryClient.getQueryData<{ status: number; data: User | null }>([QueryKeys.User]);

      if (!userData) {
        userData = await queryClient.fetchQuery({
          queryKey: [QueryKeys.User],
          queryFn: getMe,
          staleTime: 1 * 60 * 1000,
        });
      }

      if (userData && userData.status === 200 && userData.data) {
        dispatch(
          loginSuccess({
            mobile: userData.data.mobile,
            role: userData.data.role,
            full_name: userData.data.fullName ?? '',
          }),
        );
        await syncCart();
      } else {
        dispatch(loginFailure('No user data found'));
      }
    } catch (err) {
      dispatch(loginFailure('Failed to authenticate'));
      console.error('Authentication error:', err);
    }
  }, [dispatch, queryClient, syncCart]);

  useEffect(() => {
    if (!isLogin) {
      checkAuth();
    }
  }, [checkAuth, isLogin]);

  useEffect(() => {
    if (!isLogin) {
      checkAuth();
    }
  }, [checkAuth, isLogin]);

  const loginUser = useCallback(
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

  const logoutUser = useCallback(async () => {
    dispatch(loginStart());
    try {
      await logoutApi();
      await dispatch(clearCartAction());
      dispatch(logout());
      queryClient.removeQueries({ queryKey: [QueryKeys.User] });
    } catch (err) {
      dispatch(loginFailure('Logout failed'));
      console.error('Logout error:', err);
    }
  }, [dispatch, queryClient]);

  return {
    isLogin,
    user,
    isLoading,
    error,
    loginUser,
    logoutUser,
    checkAuth,
  };
}
