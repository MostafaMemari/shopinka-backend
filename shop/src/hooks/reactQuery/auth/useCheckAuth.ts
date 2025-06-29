import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { QueryKeys } from '@/types/query-keys';
import { getMe } from '@/service/userService';
import { User } from '@/types/userType';
import { useSyncCart } from '../cart/useSyncCart';

export function useCheckAuth() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const syncCart = useSyncCart();

  return useCallback(async () => {
    dispatch(loginStart());

    try {
      let userData = queryClient.getQueryData<{ status: number; data: User | null }>([QueryKeys.User]);

      if (!userData) {
        userData = await queryClient.fetchQuery({
          queryKey: [QueryKeys.User],
          queryFn: getMe,
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        });
      }

      if (userData?.status === 200 && userData.data) {
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
}
