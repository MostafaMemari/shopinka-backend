'use client';

import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import { calculateTotals } from '@/utils/calculateTotals';
import CartPageItem from '@/modules/cart/views/CartPageView/CartPageItem';
import Link from 'next/link';
import showConfirmDialog from '@/components/cart/showConfirmDialog';
import CartSummary from '@/components/cart/CartSummary';
import PrimaryButton from '@/components/PrimaryButton';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '@/components/profile/ErrorState';
import EmptyState from '@/components/profile/EmptyState';
import { PiBasketFill } from 'react-icons/pi';
import { useAuth } from '@/hooks/auth/useAuth';

function CartPageView() {
  const { isLogin } = useAuth();

  const { cart: cartItems, isLoading, error, clearAllCartItems } = useCart();
  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const payablePrice = totals.payablePrice;

  const handleDeleteAll = async () => {
    const result = await showConfirmDialog({
      title: 'آیا مطمئن هستید؟',
      text: 'همه اقلام سبد خرید حذف خواهند شد!',
      confirmButtonText: 'بله، حذف کن',
      cancelButtonText: 'خیر',
    });
    if (result.isConfirmed) {
      clearAllCartItems();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="col-span-12">
          <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>
      ) : error ? (
        <div className="col-span-12">
          <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
            <ErrorState message={error.message} />
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="col-span-12">
          <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
            <EmptyState icon={<PiBasketFill className="w-full h-full" />} message="سبد خرید خالی می‌باشد" />
          </div>
        </div>
      ) : (
        <>
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-lg bg-muted p-4 min-h-[300px]">
              <div className="flex items-center justify-between gap-x-2 pb-4">
                <h1 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">
                  سبد خرید
                  <span className="text-sm text-text/60"> ( {cartItems.length} کالا ) </span>
                </h1>
                <button
                  type="button"
                  className="btn-red-nobg px-3 py-2 text-sm cursor-pointer flex items-center gap-2"
                  onClick={handleDeleteAll}
                >
                  <HiOutlineTrash className="h-6 w-6" />
                  <span>حذف همه</span>
                </button>
              </div>
              <ul className="divide-y">
                {cartItems.map((item, index) => (
                  <li key={item.id}>
                    <CartPageItem cartItem={item} isLast={index === cartItems.length - 1} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CartSummary
            totalQuantity={totalQuantity}
            payablePrice={payablePrice}
            totalDiscountPrice={totalDiscountPrice}
            totalPrice={totalPrice}
          >
            <div>
              <Link href={isLogin ? '/checkout/shipping' : '/login?backUrl=/checkout/shipping'} className="w-full">
                <PrimaryButton type="submit">ادامه فرایند خرید</PrimaryButton>
              </Link>
            </div>
          </CartSummary>
        </>
      )}
    </>
  );
}

export default CartPageView;
