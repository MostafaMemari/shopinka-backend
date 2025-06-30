import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { getMe } from '@/service/userService';
import { QueryKeys } from '@/types/query-keys';
import { User } from '@/types/userType';

export function useCheckAuth() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

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
      } else {
        dispatch(loginFailure('No user data found'));
      }
    } catch (err) {
      dispatch(loginFailure('Failed to authenticate'));
      console.error('Authentication error:', err);
    }
  }, [dispatch, queryClient]);
}
