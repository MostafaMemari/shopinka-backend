import { useQueryClient } from '@tanstack/react-query';
import { createCartBulk, getCart } from '@/service/cartService';
import { setCart } from '@/store/slices/cartSlice';
import { CartData, CartItemState } from '@/types/cartType';
import { QueryKeys } from '@/types/query-keys';
import { store } from '@/store';

export const useSyncCart = () => {
  const queryClient = useQueryClient();

  const sync = async () => {
    let localCart: CartItemState[] = [];

    try {
      localCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    } catch {
      localStorage.removeItem('cart');
    }

    const pullServerCart = async () => {
      const cartData = await queryClient.fetchQuery({
        queryKey: [QueryKeys.Cart],
        queryFn: getCart,
        staleTime: 1 * 60 * 1000,
      });

      store.dispatch(setCart({ items: cartData.items }));
    };

    if (localCart.length === 0) {
      await pullServerCart();
      return;
    }

    const itemsPayload: CartData[] = localCart.map((item) => ({
      quantity: item.count,
      productId: item.type === 'SIMPLE' ? Number(item.id) : undefined,
      productVariantId: item.type === 'VARIABLE' ? Number(item.id) : undefined,
    }));

    try {
      await createCartBulk({ items: itemsPayload });
      localStorage.removeItem('cart');
      await pullServerCart();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
    } catch (err) {
      console.error('❌ Failed to sync cart:', err);
    }
  };

  return sync;
};
