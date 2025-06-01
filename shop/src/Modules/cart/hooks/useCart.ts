// src/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../types/cartType';
import { clearCart, decreaseCount, deleteFromCart, increaseCount, setCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store';

export function useCart() {
  const dispatch = useDispatch();
  const { cart, totalPrice, totalDiscountPrice, totalDiscount } = useSelector((state: RootState) => state.cart);

  const handleSetCart = (items: CartItem[]) => {
    dispatch(setCart(items));
  };

  const handleDecreaseCount = (product: CartItem) => {
    dispatch(decreaseCount(product));
  };

  const handleIncreaseCount = (product: CartItem) => {
    dispatch(increaseCount(product));
  };

  const handleDeleteFromCart = (productID: number) => {
    dispatch(deleteFromCart(productID.toString()));

    // deleteOrder(productID.toString());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    cart,
    setCart: handleSetCart,
    totalPrice,
    totalDiscountPrice,
    totalDiscount,
    decreaseCount: handleDecreaseCount,
    increaseCount: handleIncreaseCount,
    deleteFromCart: handleDeleteFromCart,
    clearCart: handleClearCart,
  };
}
