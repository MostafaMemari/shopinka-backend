import React from 'react';

import CheckoutProgress from '@/modules/checkout/components/CheckoutProgress';
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
