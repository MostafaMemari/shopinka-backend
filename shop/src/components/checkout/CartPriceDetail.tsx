'use client';

import CartStatus from '@/components/CartStatus copy';
import PrimaryButton from '@/components/PrimaryButton';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import CartSummary from '@/components/cart/CartSummary';
import { calculateTotals } from '@/modules/cart/utils/calculateTotals';
import Link from 'next/link';

export default function CartPriceDetail() {
  const { cart: cartItems, isLoading, error } = useCart();

  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const payablePrice = totals.payablePrice;

  return (
    <>
      <div className="col-span-12 md:col-span-4">
        {isLoading ? (
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
            shippingCost={5000}
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
