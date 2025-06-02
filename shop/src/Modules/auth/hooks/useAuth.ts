// hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, logout } from '@/store/slices/authSlice';
import { User } from '../types/userType';

export function useAuth() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const user = useAppSelector((state) => state.auth.user);

  const loginUser = (userData: User) => {
    dispatch(login(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    isLogin,
    user,
    loginUser,
    logoutUser,
  };
}
