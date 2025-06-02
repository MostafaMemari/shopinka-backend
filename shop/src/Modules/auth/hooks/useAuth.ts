import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';
import { UserState } from '@/Modules/auth/types/userType';
import { getMe } from '../services/user.api';
import { logout as logoutApi } from '../services/auth.api';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isLogin, user, isLoading, error } = useAppSelector((state) => state.auth);

  const checkAuth = useCallback(async () => {
    dispatch(loginStart());
    try {
      const userData = await getMe();

      if (userData.status === 200 && userData?.data) {
        dispatch(
          loginSuccess({
            mobile: userData.data.mobile,
            role: userData.data.role,
            full_name: userData.data.fullName ?? '',
          }),
        );
      } else {
        dispatch(loginFailure('No user data found'));
      }
    } catch (err) {
      dispatch(loginFailure('Failed to authenticate'));
      console.error('Authentication error:', err);
    }
  }, [dispatch]);

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
      } catch (err) {
        dispatch(loginFailure('Login failed'));
        console.error('Login error:', err);
      }
    },
    [dispatch],
  );

  const logoutUser = useCallback(async () => {
    dispatch(loginStart());
    try {
      await logoutApi();

      dispatch(logout());
    } catch (err) {
      dispatch(loginFailure('Logout failed'));
      console.error('Logout error:', err);
    }
  }, [dispatch]);

  return {
    isLogin,
    user,
    isLoading,
    error,
    loginUser,
    logoutUser,
  };
}
