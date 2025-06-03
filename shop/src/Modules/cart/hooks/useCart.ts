import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemState } from '../types/cartType';
import { clearCart, decreaseCount, deleteFromCart, increaseCount, loadCart, setCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store';

export function useCart() {
  const dispatch = useDispatch();
  const { cart, totalPrice, totalDiscountPrice, totalDiscount } = useSelector((state: RootState) => state.cart);

  // لود کردن سبد خرید از localStorage موقع مونت شدن هوک
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const handleSetCart = (items: CartItemState[]) => {
    dispatch(setCart(items));
  };

  const handleDecreaseCount = (product: CartItemState) => {
    dispatch(decreaseCount(product));
  };

  const handleIncreaseCount = (product: CartItemState) => {
    dispatch(increaseCount(product));
  };

  const handleDeleteFromCart = (productID: number) => {
    dispatch(deleteFromCart(productID.toString()));
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
// deleteOrder(productID.toString());
