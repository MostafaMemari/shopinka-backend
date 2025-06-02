import { shopApiFetch } from '@/server/api';
import { User } from '../types/userType';

export const getMe = async (): Promise<{ status: number; data: User }> => {
  const res = await shopApiFetch('/user/me', { method: 'GET' });

  return {
    ...res,
  };
};
