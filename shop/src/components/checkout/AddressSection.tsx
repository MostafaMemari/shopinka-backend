'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineEditLocation } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import ErrorState from '../profile/ErrorState';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AddressItem as AddressItemType } from '@/types/addressType';
import AddressItem from './AddressItem';
import CreateAddress from '../profile/Address/CreateAddress';

export interface Option {
  value: string;
  label: string;
}

interface AddressSectionProps {
  onAddressSelect: (id: number | null) => void;
}

export default function AddressSection({ onAddressSelect }: AddressSectionProps) {
  const { data, isLoading, error } = useAddress({});
  const addresses: AddressItemType[] = data?.data.items || [];
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
    onAddressSelect(id);
  };

  useEffect(() => {
    if (isLoading) return;
    if (addresses.length === 0) {
    } else if (addresses.length > 0 && selectedAddressId === null) {
      handleSelectAddress(addresses[0].id);
    }
  }, [addresses, isLoading, selectedAddressId]);

  return (
    <div className="mb-6">
      {isLoading ? (
        <div className="flex justify-center items-center rounded-lg bg-muted p-4 min-h-[100px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorState message={error.message} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h3 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
              <MdOutlineEditLocation className="h-5 w-5 text-primary" />
              آدرس تحویل سفارش
            </h3>

            <CreateAddress />
          </div>
          <fieldset className="space-y-4 grid grid-cols-1">
            {addresses.length ? (
              addresses.map((item) => (
                <AddressItem key={item.id} item={item} selectedAddressId={selectedAddressId} onSelectAddress={handleSelectAddress} />
              ))
            ) : (
              <p className="text-sm text-gray-500">هیچ آدرسی ثبت نشده است.</p>
            )}
          </fieldset>
        </>
      )}
    </div>
  );
}
