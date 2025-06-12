import React from 'react';

import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import CartPageView from '@/modules/cart/views/CartPageView';

async function Page() {
  return (
    <>
      <CheckoutProgress currentStep="cart" />
      <CartPageView />
    </>
  );
}

export default Page;
