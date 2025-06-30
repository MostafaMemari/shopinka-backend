import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useCheckAuth } from './useCheckAuth';
import { useLoginUser } from './useLoginUser';
import { useLogoutUser } from './useLogoutUser';

export function useAuth() {
  const { isLogin, user, isLoading, error } = useAppSelector((state) => state.auth);
  const checkAuth = useCheckAuth();
  const loginUser = useLoginUser();
  const logoutUser = useLogoutUser();

  useEffect(() => {
    if (!isLogin) checkAuth();
  }, [checkAuth, isLogin]);

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
