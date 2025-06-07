import { shopApiFetch } from '@/server/api';
import { pager } from '@/shared/types/paginationType';
import { ShippingItem } from '../types/shipping.type';
import { AddressItem } from '@/modules/address/types/address.type';

// export const getShipping = async (): Promise<{ status: number; data: { items: ShippingItem[]; pager: pager } }> => {
//   const res = await shopApiFetch('/shipping', { method: 'GET' });

//   return {
//     ...res,
//   };
// };

export const getAddress = async (): Promise<{ status: number; data: { items: AddressItem[]; pager: pager } }> => {
  const res = await shopApiFetch('/shipping', { method: 'GET' });

  return {
    ...res,
  };
};
