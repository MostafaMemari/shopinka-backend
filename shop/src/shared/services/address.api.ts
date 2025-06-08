import { shopApiFetch } from '@/server/api';
import { pager } from '@/shared/types/paginationType';
import { AddressForm, AddressItem } from '@/modules/address/types/address.type';

export const createAddress = async (data: AddressForm): Promise<{ status: number; data: { message: string; address: AddressItem } }> => {
  const res = await shopApiFetch('/address', { method: 'POST', body: { ...data } });

  return { ...res };
};

export const getAddress = async (): Promise<{ status: number; data: { items: AddressItem[]; pager: pager } }> => {
  const res = await shopApiFetch('/address', { method: 'GET' });

  return { ...res };
};
