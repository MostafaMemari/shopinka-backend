'use client';

import { HiOutlineChevronLeft, HiOutlineShoppingCart } from 'react-icons/hi';
import { calculateTotals } from '../utils/calculateTotals';
import { useDropdown } from '@/shared/hooks/useDropdown';
import Link from 'next/link';
import DesktopBasketItem from './DesktopBasketItem';
import { formatPrice } from '@/shared/utils/formatter';
import IconButtonWithBadge from '@/components/IconButtonWithBadge';
import { useCart } from '@/hooks/reactQuery/cart/useCart';

export default function BasketDropdown() {
  const { cart: cartItems, isLoading, error } = useCart();
  const { isOpen, dropdownRef, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdown({
    closeOnOutsideClick: false,
    openOnHover: true,
  });

  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;

  return (
    <div className="relative">
      <div className="relative hidden md:block">
        <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <IconButtonWithBadge
            icon={<HiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />}
            badgeCount={totalQuantity}
            onClick={closeDropdown}
            ariaLabel="باز کردن سبد خرید"
            isLoading={isLoading}
          />

          <div
            className={`absolute left-0 z-10 w-[400px] rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-200 origin-top ${
              isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between p-5 pb-2">
              <div className="text-sm text-text/90">{cartItems?.length} مورد</div>
              <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout-cart">
                <div>مشاهده سبد خرید</div>
                <div>
                  <HiOutlineChevronLeft className="h-5 w-5" />
                </div>
              </Link>
            </div>

            <div className="h-60">
              <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-5 pl-2">
                {cartItems?.length > 0 ? (
                  cartItems?.map((item) => (
                    <li key={item.id}>
                      <DesktopBasketItem item={item} />
                    </li>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-text/60">سبد خرید خالی است</div>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t p-5">
              <div className="flex flex-col items-center gap-y-1">
                <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
                <div className="text-text/90">
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                  <span className="text-sm"> تومان</span>
                </div>
              </div>
              <Link href="/checkout-shipping">
                <button className="btn-primary w-32 py-3 text-sm" type="button">
                  ثبت سفارش
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
