import { shopApiFetch } from '@/service/api';
import { pager } from '@/types/paginationType';
import { AddressFormType, AddressItem } from '@/types/addressType';

export const createAddress = async (data: AddressFormType): Promise<{ message: string; address: AddressItem }> => {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
  );

  const res = await shopApiFetch('/address', { method: 'POST', body: { ...cleanedData } });

  if (res.status >= 400 || !res.data?.address) {
    throw new Error(res.data?.message || 'خطا در ایجاد آدرس');
  }

  return res.data;
};

export const updateAddress = async (id: number, data: AddressFormType): Promise<{ message: string; address: AddressItem }> => {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
  );

  const res = await shopApiFetch(`/address/${id}`, { method: 'PATCH', body: { ...cleanedData } });

  if (res.status >= 400 || !res.data?.address) {
    throw new Error(res.data?.message || 'خطا در ویرایش آدرس');
  }

  return res.data;
};

export const deleteAddress = async (id: number): Promise<{ message: string }> => {
  const res = await shopApiFetch(`/address/${id}`, { method: 'DELETE' });

  if (res.status >= 400) {
    throw new Error(res.data?.message || 'خطا در حذف آدرس');
  }

  return res.data;
};

export const getAddress = async (): Promise<{ status: number; data: { items: AddressItem[]; pager: pager } }> => {
  const res = await shopApiFetch('/address', { method: 'GET' });

  return { ...res };
};
