'use client';

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setCart, addToCart, increaseCount, decreaseCount, deleteFromCart, clearCartAction } from '@/store/slices/cartSlice';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/Modules/cart/services/cart.api';
import { CartResponse, CartData, CartItemState } from '@/Modules/cart/types/cartType';
import { QueryOptions } from '@/shared/types/queryOptions';
import { QueryKeys } from '@/shared/types/query-keys';
import { useAuth } from '@/Modules/auth/hooks/useAuth';

export function useCartData({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const { isLogin } = useAuth();

  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<CartResponse>({
    queryKey: [QueryKeys.Cart],
    queryFn: getCart,
    enabled: enabled && isLogin,
    staleTime,
  });

  return { cart, isLoading, error, refetch };
}

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { items: reduxCart } = useSelector((state: RootState) => state.cart);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { cart, isLoading, error, refetch } = useCartData({});

  useEffect(() => {
    if (isLogin && cart) {
      dispatch(setCart({ items: cart.items }));
    }
  }, [cart, dispatch, isLogin]);

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
      dispatch(setCart({ items: updatedCart.items }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to update cart quantity:', error);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeItemCart(itemId),
    onSuccess: (updatedCart) => {
      dispatch(setCart({ items: updatedCart.items }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to remove cart item:', error);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (updatedCart) => {
      dispatch(setCart({ items: updatedCart.items }));
      queryClient.setQueryData(['cart'], updatedCart);
    },
    onError: (error) => {
      console.error('Failed to clear cart:', error);
    },
  });

  const currentCart = isLogin && cart?.items ? cart.items : reduxCart;

  return {
    cart: currentCart,
    isLoading,
    error,
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
      if (!isLogin) {
        dispatch(increaseCount(item));
      } else {
        updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count + 1 });
      }
    },
    decreaseCount: (item: CartItemState) => {
      if (!isLogin) dispatch(decreaseCount(item));
      else {
        updateQuantityMutation.mutate({ itemId: item.id, quantity: item.count - 1 });
      }
    },
    deleteFromCart: (productId: number | string) => {
      if (!isLogin) {
        dispatch(deleteFromCart(productId.toString()));
      } else {
        removeItemMutation.mutate({ itemId: Number(productId) });
      }
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
