'use client';

import CartSummary from '@/modules/cart/components/CartSummary';
import { useCart } from '@/modules/cart/hooks/useCart';
import { calculateTotals } from '@/modules/cart/utils/calculateTotals';
import CartStatus from '@/shared/components/CartStatus';
import PrimaryButton from '@/shared/components/PrimaryButton';
import Link from 'next/link';

export default function CartPriceDetail() {
  const { cart: cartItems, isLoading, error, clearAllCartItems } = useCart();
  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const payablePrice = totals.payablePrice;

  return (
    <>
      <div className="col-span-12 md:col-span-4">
        {isLoading && cartItems.length <= 0 ? (
          <div className="rounded-lg bg-muted p-4 min-h-[200px]">
            <CartStatus
              cartItems={cartItems}
              error={error}
              isLoading={isLoading}
              emptyMessage="سبد خرید شما خالی است!"
              errorMessage="خطا در بارگذاری سبد خرید"
              shopButtonText="رفتن به فروشگاه"
              shopLink="/shop"
            />
          </div>
        ) : (
          <CartSummary
            totalQuantity={totalQuantity}
            payablePrice={payablePrice}
            totalDiscountPrice={totalDiscountPrice}
            totalPrice={totalPrice}
          >
            <div>
              <Link href="/checkout">
                <PrimaryButton type="submit">پرداخت</PrimaryButton>
              </Link>
            </div>
          </CartSummary>
        )}
      </div>
    </>
  );
}
