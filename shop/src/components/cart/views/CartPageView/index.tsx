'use client';

import React from 'react';
import { PiBasketFill } from 'react-icons/pi';
import { HiOutlineTrash } from 'react-icons/hi';

import CartPageItem from '@/components/cart/views/CartPageView/CartPageItem';
import showConfirmDialog from '@/components/cart/showConfirmDialog';
import CartSummary from '@/components/cart/CartSummary';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '@/components/profile/ErrorState';
import EmptyState from '@/components/profile/EmptyState';
import CartMobileFixContainer from '@/components/ui/CartMobileFixContainer';
import { formatPrice } from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

function CartPageView() {
  const router = useRouter();

  const { isLogin } = useAuth();

  const { cart, isLoading, error, clearAllCartItems } = useCart(isLogin);
  const { items: cartItems, payablePrice, totalDiscountPrice, totalPrice } = cart;

  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;

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

  const handleNextCartShipping = async () => {
    if (isLogin) router.push('/checkout/shipping');
    else router.push('/login?backUrl=/checkout/shipping');
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
          <CartMobileFixContainer>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 p-3">
                <PrimaryButton onClick={handleNextCartShipping} type="submit">
                  ادامه فرایند خرید
                </PrimaryButton>
              </div>
              <div className="p-2 flex flex-col justify-between items-center">
                <div className="text-xs font-light text-text/70 lg:text-base">مبلغ قابل پرداخت</div>
                <div className="text-primary">
                  <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(cart.payablePrice)}</span>
                  <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
                </div>
              </div>
            </div>
          </CartMobileFixContainer>
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
            <PrimaryButton onClick={handleNextCartShipping} type="submit">
              ادامه فرایند خرید
            </PrimaryButton>
          </CartSummary>
        </>
      )}
    </>
  );
}

export default CartPageView;
