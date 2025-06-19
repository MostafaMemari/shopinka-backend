'use server';

import { shopApiFetch } from '@/service/api';
import { OrderItem, OrderParams, OrderResponse } from '@/types/orderType';
import { mapCartResponseToCartItemState } from '@/utils/mapCartResponse';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<OrderResponse> => {
  const res = await shopApiFetch('/order/my', { method: 'GET', query: { ...params } });

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
