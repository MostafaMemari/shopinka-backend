// src/hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createCart, getCart, updateQuantityItemCart, removeQuantityItemCart, clearCart } from '@/Modules/cart/services/cart.api';
import { CartResponse, CartData, CartItemState } from '@/Modules/cart/types/cartType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setCart,
  mapCartResponseToCartItemState,
  addToCart,
  loadCart,
  deleteFromCart,
  decreaseCount,
  increaseCount,
} from '@/store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isSyncedWithApi, cart: reduxCart, totalPrice, totalDiscountPrice, totalDiscount } = useSelector((state: RootState) => state.cart);
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isSyncedWithApi) {
      dispatch(loadCart());
    }
  }, [dispatch, isSyncedWithApi]);

  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
    // enabled: isLogin && isSyncedWithApi,
    enabled: isLogin,
  });

  console.log(cart);

  useEffect(() => {
    if (cart && isSyncedWithApi) {
      dispatch(setCart(mapCartResponseToCartItemState(cart)));
    }
  }, [cart, dispatch, isSyncedWithApi]);

  // اضافه کردن آیتم به سبد خرید
  const addToCartMutation = useMutation({
    mutationFn: (cartData: CartData) => createCart({ cartData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // به‌روزرسانی تعداد آیتم
  const updateQuantityMutation = useMutation({
    mutationFn: ({ quantity, itemId }: { quantity: number; itemId: number }) => updateQuantityItemCart({ quantity, itemId }),
    onSuccess: (updatedCart) => {
      dispatch(setCart(mapCartResponseToCartItemState(updatedCart)));
      queryClient.setQueryData(['cart'], updatedCart);
    },
  });

  // حذف آیتم
  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeQuantityItemCart({ itemId }),
    onSuccess: (updatedCart) => {
      dispatch(setCart(mapCartResponseToCartItemState(updatedCart)));
      queryClient.setQueryData(['cart'], updatedCart);
    },
  });

  // پاک کردن سبد خرید
  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (updatedCart) => {
      dispatch(setCart(mapCartResponseToCartItemState(updatedCart)));
      queryClient.setQueryData(['cart'], updatedCart);
    },
  });

  // انتخاب سبد خرید مناسب برای نمایش
  const currentCart = isSyncedWithApi && cart ? mapCartResponseToCartItemState(cart) : reduxCart;

  return {
    cart: currentCart,
    isLoading,
    error,
    totalPrice,
    totalDiscountPrice,
    totalDiscount,
    addToCart: (item: CartItemState) => {
      if (!isLogin || !isSyncedWithApi) {
        dispatch(addToCart(item));
      } else {
        addToCartMutation.mutate({
          quantity: item.count,
          productId: item.type === 'SIMPLE' ? item.id : null,
          productVariantId: item.type === 'VARIABLE' ? item.id : null,
        });
      }
    },
    increaseCount: (item: CartItemState) => {
      if (!isLogin || !isSyncedWithApi) {
        dispatch(increaseCount(item));
      } else {
        updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count + 1 });
      }
    },
    decreaseCount: (item: CartItemState) => {
      if (!isLogin || !isSyncedWithApi) {
        dispatch(decreaseCount(item));
      } else {
        updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count - 1 });
      }
    },
    deleteFromCart: (productId: number | string) => {
      if (!isLogin || !isSyncedWithApi) {
        dispatch(deleteFromCart(productId.toString()));
      } else {
        removeItemMutation.mutate({ itemId: Number(productId) });
      }
    },
    clearCart: clearCartMutation.mutate,
    refetchCart: refetch,
  };
};
