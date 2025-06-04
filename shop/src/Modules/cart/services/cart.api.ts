import { shopApiFetch } from '@/server/api';
import { CartData, CartResponse } from '../types/cartType';

export const createCart = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  if (cartData) {
    await shopApiFetch('/cart/item', {
      method: 'POST',
      body: {
        quantity: cartData.quantity,
        productId: cartData.productId ?? undefined,
        productVariantId: cartData.productVariantId ?? undefined,
      },
    });
  }
};

export const getCart = async (): Promise<CartResponse> => {
  const res = await shopApiFetch('/cart/me', { method: 'GET' });

  return res.data;
};

export const clearCart = async (): Promise<CartResponse> => {
  const res = await shopApiFetch('/cart/clear', { method: 'POST' });

  return res.data;
};

export const updateQuantityItemCart = async ({ quantity, itemId }: { quantity: number; itemId: number }): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'POST', body: quantity });

  return res.data;
};

export const removeQuantityItemCart = async ({ itemId }: { itemId: number }): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'DELETE' });

  return res.data;
};
