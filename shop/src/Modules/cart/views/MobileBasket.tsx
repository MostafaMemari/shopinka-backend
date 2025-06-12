'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineShoppingCart, HiOutlineX } from 'react-icons/hi';
import MobileBasketItem from './MobileBasketItem';
import { CartItemState } from '@/types/cartType';
import { formatPrice } from '@/shared/utils/formatter';

interface MobileBasketDrawerProps {
  cartItems: CartItemState[] | [];
  totalPrice: number;
}

export default function MobileBasketDrawer({ cartItems, totalPrice }: MobileBasketDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer md:hidden"
        onClick={handleOpen}
      >
        <span className="cursor-pointer">
          <HiOutlineShoppingCart className="h-6 w-6" />
        </span>
        {cartItems.length > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-btn text-sm font-bold text-white">
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/50" onClick={handleClose}></div>}

      <div
        aria-labelledby="user-basket-drawer-navigation-label"
        className={`fixed left-0 top-0 z-40 h-full w-80 bg-muted transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="user-basket-drawer-navigation"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
          <button
            aria-controls="user-basket-drawer-navigation"
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90"
            onClick={handleClose}
            type="button"
          >
            <HiOutlineX className="h-5 w-5" />
            <span className="sr-only">بستن منو</span>
          </button>
          <h5 className="text-lg text-text/90">
            سبد خرید <span className="text-sm">({cartItems.length})</span>
          </h5>
        </div>

        <div className="h-full pb-[150px]">
          <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id}>
                  <MobileBasketItem item={item} />
                </li>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-text/60">سبد خرید خالی است</div>
            )}
          </ul>
        </div>

        <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between border-t p-4 px-6 py-4">
          <div className="flex flex-col items-center gap-y-1">
            <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
            <div className="text-text/90">
              <span className="font-bold">{formatPrice(totalPrice)}</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
          <Link href="/checkout-cart" className="btn-primary w-32 py-3 text-sm text-center">
            مشاهده سبد خرید
          </Link>
        </div>
      </div>
    </>
  );
}
