'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineAddLocationAlt, MdOutlineEditLocation } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import ErrorState from '../profile/ErrorState';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AddressFormType, AddressItem as AddressItemType } from '@/types/addressType';
import AddressItem from './AddressItem';
import useIsMdUp from '@/hooks/useIsMdUp';
import Dialog from '../ui/Dialog';
import AddressForm from './AddressForm';
import MobileDrawer from '../MobileDrawer';

export interface Option {
  value: string;
  label: string;
}

const provinces: Option[] = [
  { value: 'tehran', label: 'تهران' },
  { value: 'isfahan', label: 'اصفهان' },
];

const cities: { [key: string]: Option[] } = {
  tehran: [
    { value: 'tehran', label: 'تهران' },
    { value: 'rey', label: 'ری' },
  ],
  isfahan: [
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'kashan', label: 'کاشان' },
  ],
};

interface AddressSectionProps {
  onAddressSelect: (id: number | null) => void;
}

export default function AddressSection({ onAddressSelect }: AddressSectionProps) {
  const { data, isLoading, error } = useAddress({});
  const addresses: AddressItemType[] = data?.data.items || [];
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);
  const isMdUp = useIsMdUp();
  const { createAddress, isCreateAddressLoading } = useAddress({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
    onAddressSelect(id);
  };

  const handleFormSubmit = async (values: AddressFormType) => {
    createAddress(
      values,
      () => {
        setModalState(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
      (error) => {
        console.error('خطا در ارسال فرم:', error);
      },
    );
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (addresses.length === 0) {
      setModalState(true);
    } else if (addresses.length > 0 && selectedAddressId === null) {
      handleSelectAddress(addresses[0].id);
    }
  }, [addresses, isLoading, selectedAddressId]);

  const actions = (
    <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit} disabled={isCreateAddressLoading}>
      {isCreateAddressLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
    </button>
  );

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
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
              onClick={() => setModalState(true)}
            >
              <MdOutlineAddLocationAlt className="h-6 w-6" />
              <span>آدرس جدید</span>
            </button>
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

          {isMdUp ? (
            <Dialog isOpen={modalState} onClose={() => setModalState(false)} title="افزودن آدرس جدید" actions={actions} size="xl">
              <div className="mt-4">
                <AddressForm provinces={provinces} cities={cities} onSubmit={handleFormSubmit} ref={formRef} />
              </div>
            </Dialog>
          ) : (
            <MobileDrawer
              title="افزودن آدرس جدید"
              isOpen={modalState}
              onOpen={() => setModalState(true)}
              onClose={() => setModalState(false)}
              footerActions={actions}
            >
              <AddressForm provinces={provinces} cities={cities} onSubmit={handleFormSubmit} ref={formRef} />
            </MobileDrawer>
          )}
        </>
      )}
    </div>
  );
}
