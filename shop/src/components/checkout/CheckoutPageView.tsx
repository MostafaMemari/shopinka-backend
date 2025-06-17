'use client';

import React, { useState } from 'react';
import AddressSection from '@/components/checkout/AddressSection';
import DeliverySection from '@/components/checkout/DeliverySection';
import CartPriceDetail from '@/components/checkout/CartPriceDetail';
import { ShippingItem } from '@/types/shipping.type';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <div className="rounded-lg bg-muted p-4">
          <AddressSection onAddressSelect={setSelectedAddressId} />
          <DeliverySection onShippingSelect={setSelectedShippingItem} />
        </div>
      </div>
      <CartPriceDetail selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </>
  );
}

export default CheckoutPageView;
