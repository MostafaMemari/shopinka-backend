'use client';

import React, { useState } from 'react';
import { MdOutlineEditLocation } from 'react-icons/md';
import CartStatus from '@/shared/components/CartStatus';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';
import AddressFormDrawer from './AddressFormDrawer';
import AddressItem from './AddressItem';
import AddressFormDialog from './AddressFormDialog';

export default function AddressSection() {
  const { addressItems, isLoading, error } = useAddress({});

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
  };

  return (
    <>
      {isLoading || error ? (
        <CartStatus
          cartItems={[]}
          error={error}
          isLoading={isLoading}
          emptyMessage="هیچ آدرسی ثبت نشده است!"
          errorMessage="خطا در بارگذاری آدرس‌ها"
          shopButtonText="رفتن به فروشگاه"
          shopLink="/shop"
        />
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h1 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
              <MdOutlineEditLocation className="h-5 w-5 text-primary" />
              آدرس تحویل سفارش
            </h1>

            <div className="hidden md:block">
              <AddressFormDialog />
            </div>
            <div className="md:hidden">
              <AddressFormDrawer />
            </div>
          </div>
          <fieldset className="space-y-4 grid grid-cols-1 gap-4">
            <legend className="sr-only">Address Options</legend>
            <div className="space-y-4">
              {addressItems?.map((item) => (
                <AddressItem key={item.id} item={item} selectedAddressId={selectedAddressId} onSelectAddress={handleSelectAddress} />
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
}
