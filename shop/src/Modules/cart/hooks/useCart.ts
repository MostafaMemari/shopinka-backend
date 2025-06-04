'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setCart,
  mapCartResponseToCartItemState,
  addToCart,
  increaseCount,
  decreaseCount,
  deleteFromCart,
  clearCartAction,
  syncCartWithApi,
} from '@/store/slices/cartSlice';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/Modules/cart/services/cart.api';
import { CartResponse, CartData, CartItemState } from '@/Modules/cart/types/cartType';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { items: reduxCart, totalPrice, totalDiscountPrice, totalDiscount } = useSelector((state: RootState) => state.cart);
  const { isLogin } = useSelector((state: RootState) => state.auth);

  // همگام‌سازی اولیه سبد خرید
  useEffect(() => {
    if (isLogin) {
      dispatch(syncCartWithApi());
    } else {
      const cartDataLS = localStorage.getItem('cart');
      const parsedCart = cartDataLS ? JSON.parse(cartDataLS) : [];
      dispatch(setCart({ items: parsedCart }));
    }
  }, [isLogin, dispatch]);

  // گرفتن سبد خرید از API برای کاربران لاگین‌شده
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isLogin,
    staleTime: 5 * 60 * 1000, // داده‌ها به مدت 5 دقیقه تازه می‌مانند
  });

  // به‌روزرسانی Redux فقط وقتی داده‌های API تغییر کرده‌اند
  useEffect(() => {
    if (isLogin && cart) {
      const mappedCart = mapCartResponseToCartItemState(cart);
      // فقط اگر سبد خرید تغییر کرده باشد، Redux را به‌روزرسانی کن
      if (JSON.stringify(mappedCart) !== JSON.stringify(reduxCart)) {
        dispatch(setCart({ items: mappedCart }));
      }
    }
  }, [cart, dispatch, isLogin, reduxCart]);

  const addToCartMutation = useMutation({
    mutationFn: (cartData: CartData) => createCart({ cartData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to add to cart via API:', error);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ quantity, itemId }: { quantity: number; itemId: number }) => updateQuantityItemCart({ quantity, itemId }),
    onSuccess: (updatedCart) => {
      const mappedCart = mapCartResponseToCartItemState(updatedCart);
      dispatch(setCart({ items: mappedCart }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to update cart quantity:', error);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeItemCart(itemId),
    onSuccess: (updatedCart) => {
      const mappedCart = mapCartResponseToCartItemState(updatedCart);
      dispatch(setCart({ items: mappedCart }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to remove cart item:', error);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (updatedCart) => {
      const mappedCart = mapCartResponseToCartItemState(updatedCart);
      dispatch(setCart({ items: mappedCart }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to clear cart:', error);
    },
  });

  const currentCart = isLogin && cart ? mapCartResponseToCartItemState(cart) : reduxCart;

  return {
    cart: currentCart,
    isLoading,
    error,
    totalPrice: isLogin && cart ? 0 : totalPrice,
    totalDiscountPrice: isLogin && cart ? 0 : totalDiscountPrice,
    totalDiscount: isLogin && cart ? 0 : totalDiscount,
    addToCart: (item: CartItemState) => {
      if (!isLogin) {
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
      if (!isLogin) dispatch(increaseCount(item));
      else updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count + 1 });
    },
    decreaseCount: (item: CartItemState) => {
      if (!isLogin) dispatch(decreaseCount(item));
      else updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count - 1 });
    },
    deleteFromCart: (productId: number | string) => {
      if (!isLogin) dispatch(deleteFromCart(productId.toString()));
      else removeItemMutation.mutate({ itemId: Number(productId) });
    },
    clearCart: () => {
      clearCartMutation.mutate();
      if (!isLogin) {
        dispatch(clearCartAction());
      }
    },
    refetchCart: refetch,
  };
};
