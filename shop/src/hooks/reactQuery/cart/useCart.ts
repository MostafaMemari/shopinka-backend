'use client';

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setCart, addToCart, increaseCount, decreaseCount, deleteFromCart, clearCartAction } from '@/store/slices/cartSlice';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/service/cart.api';
import { CartResponse, CartData, CartItemState } from '@/types/cartType';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

export function useCartData({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  // const { isLogin } = useAuth();

  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<CartResponse>({
    queryKey: [QueryKeys.Cart],
    queryFn: getCart,
    enabled: enabled,
    staleTime,
  });

  return { cart, isLoading, error, refetch };
}

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { items: reduxCart } = useSelector((state: RootState) => state.cart);
  const { isLogin } = useAuth();
  const { cart, isLoading, error, refetch } = useCartData({});

  // console.log(isLoading);

  useEffect(() => {
    if (isLogin && cart) {
      dispatch(setCart({ items: cart.items }));
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
      dispatch(setCart({ items: localCart }));
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to update cart quantity:', error);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeItemCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to remove cart item:', error);
    },
  });

  const deleteAllItemCart = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to clear cart item:', error);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
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
    clearAllCartItems: () => {
      if (isLogin) {
        deleteAllItemCart.mutate();
      }
    },
    increaseCount: (item: CartItemState) => {
      if (!isLogin) {
        dispatch(increaseCount(item));
      } else {
        updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count + 1 });
      }
    },
    decreaseCount: (item: CartItemState) => {
      if (!isLogin) dispatch(decreaseCount(item));
      else {
        updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count - 1 });
      }
    },
    deleteFromCart: (item: CartItemState) => {
      if (!isLogin) {
        dispatch(deleteFromCart(item.id));
      } else {
        removeItemMutation.mutate({ itemId: Number(item.itemId) });
      }
    },
    clearCart: () => {
      clearCartMutation.mutate();
      if (!isLogin) {
        dispatch(clearCartAction());
      }
    },
    refetchCart: refetch,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
