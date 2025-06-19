import React, { Children, ReactNode } from 'react';
import { formatPrice } from '@/utils/formatter';
import Link from 'next/link';

interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  totalDiscountPrice: number;
  payablePrice: number;
  children: ReactNode;
  shippingCost?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalQuantity,
  totalPrice,
  totalDiscountPrice,
  payablePrice,
  shippingCost,
  children,
}) => {
  return (
    <div className="col-span-12 md:col-span-4">
      <div className="hidden rounded-lg bg-muted p-4 md:block">
        <div className="mb-2 divide-y">
          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="flex flex-col">
              <div className="text-sm text-text/90 lg:text-base">قیمت کالا ها ({totalQuantity})</div>
              {/* <Link href="/checkout/cart">
                <div className="text-blue-600 hover:underline text-sm font-normal mt-1 cursor-pointer">مشاهده سبدخرید</div>
              </Link> */}
            </div>

            <div className="text-sm text-primary lg:text-base">
              <span className="font-bold">{formatPrice(totalPrice)}</span>
              <span className="text-xs lg:text-sm"> تومان</span>
            </div>
          </div>

          {totalDiscountPrice > 0 && (
            <div className="flex items-center justify-between gap-x-2 py-6">
              <div className="text-sm text-text/90 lg:text-base">تخفیف</div>
              <div className="text-sm font-medium text-primary dark:text-red-400 lg:text-base">
                <span className="font-bold">{formatPrice(totalDiscountPrice)}</span>
                <span className="text-xs lg:text-sm"> تومان</span>
              </div>
            </div>
          )}

          {shippingCost !== undefined && (
            <div className="flex items-center justify-between gap-x-2 py-6">
              <div className="text-sm text-text/90 lg:text-base">هزینه ارسال</div>
              <div className="text-sm text-primary lg:text-base">
                <span className="font-bold">{formatPrice(shippingCost)}</span>
                <span className="text-xs lg:text-sm"> تومان</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="text-sm text-text/90 lg:text-base">مبلغ قابل پرداخت</div>
            <div className="text-sm text-primary lg:text-base">
              <span className="font-bold">{formatPrice(payablePrice)}</span>
              <span className="text-xs lg:text-sm"> تومان</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CartSummary;
