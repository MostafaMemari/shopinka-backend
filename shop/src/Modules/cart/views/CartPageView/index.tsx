'use client';

import React from 'react';
import { HiOutlineShoppingCart, HiOutlineCreditCard, HiOutlineTrash } from 'react-icons/hi';
import { TbTruckDelivery } from 'react-icons/tb';
import { BiStore } from 'react-icons/bi';
import CartPageItem from './CartPageItem';
import { useCart } from '../../hooks/useCart';
import { calculateTotals } from '../../utils/calculateTotals';
import { formatPrice } from '@/shared/utils/formatter';
import PrimaryButton from '@/shared/components/PrimaryButton';
import Swal from 'sweetalert2';
import { FaSpinner } from 'react-icons/fa';

function CartPageView() {
  const { cart: cartItems, isLoading, error, clearAllCartItems } = useCart();
  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const payablePrice = totals.payablePrice;

  const handleDeleteAll = async () => {
    const result = await Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: 'همه اقلام سبد خرید حذف خواهند شد!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن',
      cancelButtonText: 'خیر',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      clearAllCartItems();
    }
  };

  return (
    <main>
      <div className="container">
        <div className="grid grid-cols-12 gap-2 lg:gap-6">
          {/* Breadcrumb */}
          <div className="col-span-12 rounded-lg bg-muted">
            <ol className="grid grid-cols-3 overflow-hidden rounded-lg">
              <li className="flex flex-col items-center justify-center gap-2 bg-primary/10 p-4 text-xs text-primary sm:text-sm md:text-base">
                <HiOutlineShoppingCart className="h-6 w-6 md:h-8 md:w-8" />
                <p className="leading-none">سبد خرید</p>
              </li>
              <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                <TbTruckDelivery className="h-6 w-6 md:h-8 md:w-8" />
                <p className="leading-none">شیوه ارسال</p>
              </li>
              <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                <HiOutlineCreditCard className="h-6 w-6 md:h-8 md:w-8" />
                <p className="leading-none">پرداخت</p>
              </li>
            </ol>
          </div>

          {/* فقط وقتی سبد خالی است، لود می‌شود یا خطا وجود دارد */}
          {(isLoading || error || cartItems.length <= 0) && (
            <div className="col-span-12">
              <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <FaSpinner className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-sm text-text/60">در حال بارگذاری سبد خرید...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-sm text-red-500">خطا در بارگذاری سبد خرید</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <HiOutlineShoppingCart className="h-16 w-16 text-text/30" />
                    <p className="text-lg text-text/80 font-medium">سبد خرید شما خالی است!</p>
                    <p className="text-sm text-text/60 text-center">می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
                    <a href="/shop">
                      <PrimaryButton className="flex items-center gap-2">
                        <BiStore className="h-5 w-5" />
                        <span>رفتن به فروشگاه</span>
                      </PrimaryButton>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* نمایش آیتم‌های سبد خرید و جزئیات قیمت در حالت غیرخالی */}
          {!isLoading && cartItems.length > 0 && (
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

              {/* Cart Price Detail */}
              <div className="col-span-12 md:col-span-4">
                {/* Desktop */}
                <div className="hidden rounded-lg bg-muted p-4 md:block">
                  <div className="mb-2 divide-y">
                    <div className="flex items-center justify-between gap-x-2 py-6">
                      <div className="text-sm text-text/90 lg:text-base">قیمت کالا ها ({totalQuantity})</div>
                      <div className="text-sm text-primary lg:text-base">
                        <span className="font-bold">{formatPrice(totalPrice)}</span>
                        <span className="text-xs lg:text-sm"> تومان</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-x-2 py-6">
                      <div className="text-sm text-text/90 lg:text-base">تخفیف</div>
                      <div className="text-sm font-medium text-primary dark:text-red-400 lg:text-base">
                        <span className="font-bold">{formatPrice(totalDiscountPrice)}</span>
                        <span className="text-xs lg:text-sm"> تومان</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-x-2 py-6">
                      <div className="text-sm text-text/90 lg:text-base">مبلغ قابل پرداخت</div>
                      <div className="text-sm text-primary lg:text-base">
                        <span className="font-bold">{formatPrice(payablePrice)}</span>
                        <span className="text-xs lg:text-sm"> تومان</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a href="./checkout-shipping.html" className="btn-primary py-3">
                      ادامه فرایند خرید
                    </a>
                  </div>
                </div>
                {/* Mobile */}
                <div className="md:hidden">
                  <div className="fixed bottom-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
                    <div className="flex justify-between items-center text-xs rtl flex-row-reverse h-[60px]">
                      <div className="flex justify-between items-center w-full">
                        <div className="w-1/2 p-3">
                          <PrimaryButton type="submit">ادامه فرایند خرید</PrimaryButton>
                        </div>
                        <div className="flex flex-col items-center gap-y-1 p-3">
                          <div className="text-sm text-text/50">مبلغ قابل پرداخت</div>
                          <div className="text-text/90">
                            <span className="font-bold text-lg">{formatPrice(payablePrice)}</span>
                            <span className="text-sm"> تومان</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default CartPageView;
