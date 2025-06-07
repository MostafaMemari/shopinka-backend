import React from 'react';

import CheckoutProgress from '@/Modules/checkout/components/CheckoutProgress';
import CartPageView from '@/Modules/cart/views/CartPageView';

export async function Page() {
  return (
    <>
      <CheckoutProgress currentStep="cart" />
      <CartPageView />
    </>
  );
}

export default Page;
