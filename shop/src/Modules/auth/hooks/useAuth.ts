// hooks/useAuth.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';
import { UserState } from '@/Modules/auth/types/userType';
import { getMe } from '../services/user.api';

export function useAuth() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(loginStart());
      try {
        const userData = await getMe();
        if (userData.status === 200) {
          dispatch(loginSuccess({ mobile: userData.data.mobile, role: userData.data.role, full_name: userData.data.fullName ?? '' }));
        } else {
          dispatch(loginFailure('No user data found'));
        }
      } catch (err) {
        dispatch(loginFailure('Failed to authenticate'));
        console.error(err);
      }
    };

    checkAuth();
  }, [dispatch]);

  const loginUser = async (userData: UserState) => {
    dispatch(loginSuccess(userData));
  };

  const logoutUser = async () => {
    dispatch(logout());
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return {
    isLogin,
    user,
    isLoading,
    error,
    loginUser,
    logoutUser,
  };
}
