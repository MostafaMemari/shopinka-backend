import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCart } from '@/store/slices/cartSlice';
import { QueryKeys } from '@/shared/types/query-keys';
import { CartData, CartItemState } from '@/types/cartType';
import { createCartBulk, getCart } from '@/service/cart.api';

export function useSyncCart() {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const pullServerCart = async () => {
    let cartData = queryClient.getQueryData<{ items: CartItemState[] }>([QueryKeys.Cart]);

    if (!cartData) {
      cartData = await queryClient.fetchQuery({
        queryKey: [QueryKeys.Cart],
        queryFn: getCart,
        staleTime: 1 * 60 * 1000,
      });
    }

    if (cartData) {
      dispatch(setCart({ items: cartData.items }));
      return cartData.items;
    }
    return [];
  };

  const { mutateAsync: syncCartMutation } = useMutation({
    mutationFn: (itemsPayload: CartData[]) => createCartBulk({ items: itemsPayload }),
    onSuccess: () => {
      localStorage.removeItem('cart');
      pullServerCart();
    },
    onError: (err) => {
      console.error('Failed to sync cart with API:', err);
    },
  });

  const syncCart = useCallback(async () => {
    if (!isLogin) return;

    let localCart: CartItemState[] = [];
    try {
      localCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    } catch {
      localStorage.removeItem('cart');
    }

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
      await syncCartMutation(itemsPayload);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
    } catch (err) {
      console.error('Failed to sync cart:', err);
      throw err;
    }
  }, [isLogin, syncCartMutation, queryClient]);

  useEffect(() => {
    if (isLogin) {
      syncCart();
    }
  }, [isLogin, syncCart]);

  return { syncCart };
}
