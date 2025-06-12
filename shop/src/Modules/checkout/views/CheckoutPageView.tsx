import React from 'react';
import AddressSection from '@/components/checkout/AddressSection';
import DeliverySection from '@/components/checkout/DeliverySection';
import CartPriceDetail from '@/components/checkout/CartPriceDetail';

function CheckoutPageView() {
  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <div className="rounded-lg bg-muted p-4">
          <AddressSection />

          <DeliverySection />
        </div>
      </div>
      <CartPriceDetail />
    </>
  );
}

export default CheckoutPageView;
