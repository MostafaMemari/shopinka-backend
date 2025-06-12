import { shopApiFetch } from '@/server/api';
import { pager } from '@/types/paginationType';
import { ShippingItem } from '../types/shipping.type';

export const getShipping = async (): Promise<{ status: number; data: { items: ShippingItem[]; pager: pager } }> => {
  const res = await shopApiFetch('/shipping', { method: 'GET' });

  return {
    ...res,
  };
};
