'use client';

import React, { useState } from 'react';
import { MdOutlineEditLocation } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import AddressItem from './AddressItem';
import AddressFormDialog from './AddressFormDialog';
import AddressFormDrawer from './AddressFormDrawer';
import ErrorState from '../profile/ErrorState';

export default function AddressSection() {
  const { data, isLoading, error } = useAddress({});

  const addresses = data?.data.items || [];

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : error ? (
        <ErrorState message={error.message} />
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between gap-x-2 pb-4">
              <h3 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
                <MdOutlineEditLocation className="h-5 w-5 text-primary" />
                آدرس تحویل سفارش
              </h3>

              <div className="hidden md:block">
                <AddressFormDialog />
              </div>
              <div className="md:hidden">
                <AddressFormDrawer />
              </div>
            </div>
            <fieldset className="space-y-4 grid grid-cols-1 gap-4">
              <div className="space-y-4">
                {addresses?.map((item) => (
                  <AddressItem key={item.id} item={item} selectedAddressId={selectedAddressId} onSelectAddress={handleSelectAddress} />
                ))}
              </div>
            </fieldset>
          </div>
        </>
      )}
    </>
  );
}
