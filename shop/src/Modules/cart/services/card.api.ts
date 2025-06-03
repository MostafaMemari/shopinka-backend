import { shopApiFetch } from '@/server/api';
import { CardData, CardItem } from '../types/cartType';

export const createCard = async (data: CardData): Promise<{ message: string; cartItem: CardItem }> => {
  const res = await shopApiFetch('/cart/item', {
    method: 'POST',
    body: { ...data },
  });

  return {
    message: res.data.message,
    cartItem: res.data.cartItem,
  };
};
