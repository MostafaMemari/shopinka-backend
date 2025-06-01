import { RootState } from '@/store';
import { clearCart, decreaseCount, deleteFromCart, increaseCount, setCart } from '@/store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export function useCart() {
  const dispatch = useDispatch();
  const { cart, totalPrice, totalDiscountPrice, totalDiscount } = useSelector((state: RootState) => state.cart);

  const handleSetCart = (items: any[]) => {
    dispatch(setCart(items));
  };

  const handleDecreaseCount = (product: any) => {
    dispatch(decreaseCount(product));
  };

  const handleIncreaseCount = (product: any) => {
    dispatch(increaseCount(product));
  };

  const handleDeleteFromCart = (productID: string) => {
    dispatch(deleteFromCart(productID));
    // deleteOrder(productID); // فراخوانی اکشن حذف سفارش
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
