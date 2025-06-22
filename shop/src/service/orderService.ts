'use server';

import { shopApiFetch } from '@/service/api';
import { OrderCountsResponse, OrderItem, OrderParams, OrderResponse } from '@/types/orderType';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<OrderResponse> => {
  const res = await shopApiFetch('/order/my', { method: 'GET', query: { ...params } });

  return {
    ...res.data,
  };
};

export const getCountOrders = async (): Promise<OrderCountsResponse> => {
  const res = await shopApiFetch('/order/my/counts', { method: 'GET' });

  return {
    ...res.data,
  };
};

export const getOrderById = async (id: number): Promise<OrderItem> => {
  const res = await shopApiFetch(`/order/my/${id}`, { method: 'GET' });

  return {
    ...res.data,
  };
};
