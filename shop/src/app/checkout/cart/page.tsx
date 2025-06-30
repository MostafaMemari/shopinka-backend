import React from 'react';

import CheckoutProgress from '@/components/features/checkout/CheckoutProgress';
import CartPageView from '@/components/features/cart/views/CartPageView';

async function Page() {
  return (
    <>
      <CheckoutProgress currentStep="cart" />
      <CartPageView />
    </>
  );
}

export default Page;
