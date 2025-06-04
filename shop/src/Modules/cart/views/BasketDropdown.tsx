'use client';

import { HiOutlineShoppingCart } from 'react-icons/hi';
import DesktopBasketDropdown from './DesktopBasket';
import MobileBasketDrawer from './MobileBasket';
import { useCart } from '../hooks/useCart';
import { PulseLoader } from 'react-spinners';
import { calculateTotals } from '../utils/calculateTotals';

export default function BasketDropdown() {
  const { cart: cartItems, isLoading, error } = useCart();

  const totals = calculateTotals(cartItems);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const totalDiscount = totals.totalDiscount;

  if (isLoading) {
    return (
      <div className="flex h-9 items-center justify-center gap-2 rounded-full px-4">
        <PulseLoader color="var(--color-primary, #10b981)" size={6} loading aria-label="در حال بارگذاری" />
      </div>
    );
  }

  return (
    <div className="group relative">
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer">
        <span className="cursor-pointer">
          <HiOutlineShoppingCart className="h-6 w-6" />
        </span>
        {totalQuantity > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-btn text-sm font-bold text-white">
            {totalQuantity}
          </span>
        )}
      </button>

      <div className="relative group hidden md:block">
        <DesktopBasketDropdown cartItems={cartItems} totalPrice={totalPrice} />
      </div>

      <div className="md:hidden">
        <MobileBasketDrawer cartItems={cartItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
