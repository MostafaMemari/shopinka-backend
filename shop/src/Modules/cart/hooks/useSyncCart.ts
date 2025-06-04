import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, createCartBulk } from '../services/cart.api';
import { setCart } from '@/store/slices/cartSlice';
import { QueryKeys } from '@/shared/types/query-keys';
import { CartData, CartItemState } from '../types/cartType';

export function useSyncCart() {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const pullServerCart = async () => {
    // تلاش برای گرفتن داده از کش
    let cartData = queryClient.getQueryData<{ items: CartItemState[] }>([QueryKeys.Cart]);

    if (!cartData) {
      // اگه داده توی کش نبود، کوئری رو دستی اجرا کن
      cartData = await queryClient.fetchQuery({
        queryKey: [QueryKeys.Cart],
        queryFn: getCart,
        staleTime: 1 * 60 * 1000, // مشابه useCartData
      });
    }

    if (cartData) {
      dispatch(setCart({ items: cartData.items }));
      return cartData.items;
    }
    return [];
  };

  // موتیشن برای ارسال آیتم‌های محلی به سرور
  const { mutateAsync: syncCartMutation } = useMutation({
    mutationFn: (itemsPayload: CartData[]) => createCartBulk({ items: itemsPayload }),
    onSuccess: () => {
      localStorage.removeItem('cart');
      pullServerCart(); // بعد از موفقیت، سبد خرید رو از سرور بگیر
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
      // اطمینان از به‌روزرسانی useCartData
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
    } catch (err) {
      console.error('Failed to sync cart:', err);
      throw err; // برای مدیریت خطا در کامپوننت
    }
  }, [isLogin, syncCartMutation, queryClient]);

  return { syncCart };
}
