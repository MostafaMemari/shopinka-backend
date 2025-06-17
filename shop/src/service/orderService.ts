'use server';

import { shopApiFetch } from '@/server/api';
import { OrderParams, OrderResponse } from '@/types/orderType';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<OrderResponse> => {
  const res = await shopApiFetch('/order/my', { method: 'GET', query: { ...params } });

  console.log(res);
  return {
    ...res.data,
  };
};
