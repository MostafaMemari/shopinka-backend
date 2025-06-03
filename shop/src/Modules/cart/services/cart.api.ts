import { shopApiFetch } from '@/server/api';
import { CartData, CartItem } from '../types/cartType';

export const createCart = async (data: CartData): Promise<{ message: string; cartItem: CartItem }> => {
  const res = await shopApiFetch('/cart/item', {
    method: 'POST',
    body: { ...data },
  });

  return {
    message: res.data.message,
    cartItem: res.data.cartItem,
  };
};

export const CreateCartFromLocalStorage = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  console.log(cartData);

  if (cartData) {
    const res = await shopApiFetch('/cart/item', {
      method: 'POST',
      body: {
        quantity: cartData.quantity,
        productId: cartData.productId ?? undefined,
        productVariantId: cartData.productVariantId ?? undefined,
      },
    });

    console.log(res);
  }

  // const res = JSON.parse(cartData);
  // await shopApiFetch('/cart/register', {
  //   method: 'POST',
  //   body: cart,
  // });
};
