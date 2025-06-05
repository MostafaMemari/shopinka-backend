import { shopApiFetch } from '@/server/api';
import { CartData, CartResponse } from '../types/cartType';
import { mapCartResponseToCartItemState } from '../utils/mapCartResponse';

export const createCart = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  if (cartData) {
    const res = await shopApiFetch('/cart/item', {
      method: 'POST',
      body: {
        quantity: cartData.quantity,
        productId: cartData.productId ?? undefined,
        productVariantId: cartData.productVariantId ?? undefined,
      },
    });
  }
};

export const createCartBulk = async ({ items }: { items: CartData[] }): Promise<void> => {
  if (items.length > 0) {
    const res = await shopApiFetch('/cart/items', {
      method: 'POST',
      body: { items },
    });
  }
};

export const getCart = async (): Promise<CartResponse> => {
  const res = await shopApiFetch('/cart/me', { method: 'GET' });

  const mappedItems = mapCartResponseToCartItemState(res.data.items);

  return {
    ...res.data,
    items: mappedItems,
  };
};

export const clearCart = async (): Promise<CartResponse> => {
  const res = await shopApiFetch('/cart/clear', { method: 'POST' });

  return res.data;
};

export const updateQuantityItemCart = async ({ quantity, itemId }: { quantity: number; itemId: number }): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'PATCH', body: { quantity } });

  console.log(res);

  return res.data;
};

export const removeItemCart = async (itemId: number): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'DELETE' });

  return res.data;
};
