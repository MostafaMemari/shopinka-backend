'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setCart,
  addToCart as addLocalCart,
  increaseCount,
  decreaseCount,
  deleteFromCart as deleteLocalCart,
} from '@/store/slices/cartSlice';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/service/cartService';
import { CartData, CartItemState, CartState } from '@/types/cartType';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';

const useCartData = ({ enabled = true, staleTime = 60_000 }: QueryOptions) => {
  const query = useQuery<CartState>({
    queryKey: [QueryKeys.Cart],
    queryFn: getCart,
    enabled,
    staleTime,
  });

  return query;
};

export const useCart = (isLogin: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const { items: reduxCart, payablePrice, totalDiscountPrice, totalPrice } = useSelector((state: RootState) => state.cart);

  const { data, isLoading, error, refetch } = useCartData({ enabled: !!isLogin });

  useEffect(() => {
    if (isLogin && data) {
      dispatch(setCart({ items: data.items }));
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
      dispatch(setCart({ items: localCart }));
    }
  }, [data, dispatch, isLogin]);

  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
  };

  const addToCartMutation = useMutation({
    mutationFn: (cartData: CartData) => createCart({ cartData }),
    onSuccess: invalidateCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ quantity, itemId }: { quantity: number; itemId: number }) => updateQuantityItemCart({ quantity, itemId }),
    onSuccess: invalidateCart,
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeItemCart(itemId),
    onSuccess: invalidateCart,
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: invalidateCart,
  });

  const currentCart: CartState = useMemo(() => {
    return isLogin && data?.items ? data : { items: reduxCart, payablePrice, totalDiscountPrice, totalPrice };
  }, [isLogin, data, reduxCart, payablePrice, totalDiscountPrice, totalPrice]);

  const handleAddToCart = (item: CartItemState) => {
    if (!isLogin) {
      dispatch(addLocalCart(item));
    } else {
      addToCartMutation.mutate({
        quantity: item.count,
        productId: item.type === 'SIMPLE' ? item.id : null,
        productVariantId: item.type === 'VARIABLE' ? item.id : null,
      });
    }
  };

  const handleIncrease = (item: CartItemState) => {
    if (!isLogin) {
      dispatch(increaseCount(item));
    } else {
      updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count + 1 });
    }
  };

  const handleDecrease = (item: CartItemState) => {
    if (!isLogin) {
      dispatch(decreaseCount(item));
    } else {
      updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count - 1 });
    }
  };

  const handleDelete = (item: CartItemState) => {
    if (!isLogin) {
      dispatch(deleteLocalCart(item.id));
    } else {
      removeItemMutation.mutate({ itemId: Number(item.itemId) });
    }
  };

  const handleClearAll = () => {
    if (isLogin) clearCartMutation.mutate();
  };

  return {
    cart: currentCart,
    isLoading,
    error,
    addToCart: handleAddToCart,
    increaseCount: handleIncrease,
    decreaseCount: handleDecrease,
    deleteFromCart: handleDelete,
    clearAllCartItems: handleClearAll,
    refetchCart: refetch,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
