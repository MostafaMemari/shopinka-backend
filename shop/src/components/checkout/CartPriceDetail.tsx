'use client';

import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import CartSummary from '@/components/cart/CartSummary';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ShippingItem } from '@/types/shippingType';
import { useCreatePayment } from '@/hooks/reactQuery/payment/useCreatePayment';
import { useAuth } from '@/hooks/auth/useAuth';
import CartMobileFixContainer from '../CartMobileFixContainer';
import { formatPrice } from '@/utils/formatter';

interface CartPriceDetailProps {
  selectedAddressId: number | null;
  selectedShippingItem: ShippingItem | null;
}

export default function CartPriceDetail({ selectedAddressId, selectedShippingItem }: CartPriceDetailProps) {
  const { isLogin } = useAuth();
  const { cart, isLoading } = useCart(isLogin);
  const { items: cartItems, payablePrice, totalDiscountPrice, totalPrice } = cart;

  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const isCheckoutDisabled = !selectedAddressId;
  const shippingPrice = selectedShippingItem?.price ?? 0;

  const { createPayment, isCreatePaymentLoading } = useCreatePayment();

  const handleCreatePayment = () => {
    createPayment(
      {
        addressId: selectedAddressId ?? 0,
        shippingId: selectedShippingItem?.id ?? 0,
        description: 'testtttt',
      },
      () => {
        console.log('Payment created successfully');
      },
    );
  };

  return (
    <div className="col-span-12 md:col-span-4">
      {isLoading || !shippingPrice ? (
        <div className="flex justify-center items-center rounded-lg bg-muted p-4 min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <CartMobileFixContainer>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 p-3">
                <PrimaryButton type="submit" disabled={isCheckoutDisabled} onClick={handleCreatePayment} isLoading={isCreatePaymentLoading}>
                  {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
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

          <CartSummary
            totalQuantity={totalQuantity}
            payablePrice={payablePrice + shippingPrice}
            totalDiscountPrice={totalDiscountPrice}
            shippingCost={shippingPrice}
            totalPrice={totalPrice}
          >
            <div>
              <PrimaryButton type="submit" disabled={isCheckoutDisabled} onClick={handleCreatePayment} isLoading={isCreatePaymentLoading}>
                {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
              </PrimaryButton>
            </div>
          </CartSummary>
        </>
      )}
    </div>
  );
}
