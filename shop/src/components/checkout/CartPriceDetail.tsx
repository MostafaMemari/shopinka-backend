'use client';

import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import CartSummary from '@/components/cart/CartSummary';
import { calculateTotals } from '@/utils/calculateTotals';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ShippingItem } from '@/types/shipping.type';

interface CartPriceDetailProps {
  selectedAddressId: number | null;
  selectedShippingItem: ShippingItem | null;
}

export default function CartPriceDetail({ selectedAddressId, selectedShippingItem }: CartPriceDetailProps) {
  const { cart: cartItems, isLoading } = useCart();
  const totals = calculateTotals(cartItems);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const totalPrice = totals.totalPrice;
  const totalDiscountPrice = totals.totalDiscountPrice;
  const payablePrice = totals.payablePrice;
  const isCheckoutDisabled = !selectedAddressId || !selectedShippingItem;
  const shippingPrice = selectedShippingItem?.price ?? 0;

  const handlePayment = () => {
    console.log('selectedAddressId', selectedAddressId);
    console.log('selectedShippingId', selectedShippingItem);
  };

  return (
    <div className="col-span-12 md:col-span-4">
      {isLoading || !shippingPrice ? (
        <div className="flex justify-center items-center rounded-lg bg-muted p-4 min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : (
        <CartSummary
          totalQuantity={totalQuantity}
          payablePrice={payablePrice + shippingPrice}
          totalDiscountPrice={totalDiscountPrice}
          shippingCost={shippingPrice}
          totalPrice={totalPrice}
        >
          <div>
            {/* <Link href={isCheckoutDisabled ? '#' : '/checkout'}> */}
            <PrimaryButton type="submit" disabled={isCheckoutDisabled} onClick={handlePayment}>
              {isCheckoutDisabled ? 'لطفاً آدرس و شیوه ارسال را انتخاب کنید' : 'پرداخت'}
            </PrimaryButton>
            {/* </Link> */}
          </div>
        </CartSummary>
      )}
    </div>
  );
}
