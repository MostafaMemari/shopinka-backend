'use client';

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setCart, addToCart, increaseCount, decreaseCount, deleteFromCart } from '@/store/slices/cartSlice';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/service/cartService';
import { CartData, CartItemState, CartState } from '@/types/cartType';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';

export function useCartData({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  // const { isLogin } = useAuth();

  const { data, isLoading, error, refetch } = useQuery<CartState>({
    queryKey: [QueryKeys.Cart],
    queryFn: getCart,
    enabled: enabled,
    staleTime,
  });

  return { data, isLoading, error, refetch };
}

export const useCart = (isLogin: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { items: reduxCart, payablePrice, totalDiscountPrice, totalPrice } = useSelector((state: RootState) => state.cart);
  const { data, isLoading, error, refetch } = useCartData({});

  // console.log(isLoading);

  useEffect(() => {
    if (isLogin && data) {
      dispatch(setCart({ items: data.items }));
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
      dispatch(setCart({ items: localCart }));
    }
  }, [data, dispatch, isLogin]);

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

  const currentCart: CartState = isLogin && data?.items ? data : { items: reduxCart, payablePrice, totalDiscountPrice, totalPrice };

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
    refetchCart: refetch,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
