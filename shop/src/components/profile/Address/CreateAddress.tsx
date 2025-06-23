'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import { AddressFormType, AddressItem as AddressItemType } from '@/types/addressType';
import useIsMdUp from '@/hooks/useIsMdUp';
import ErrorState from '../ErrorState';
import Dialog from '@/components/ui/Dialog';
import AddressForm from '@/components/checkout/AddressForm';
import MobileDrawer from '@/components/ui/MobileDrawer';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function CreateAddress({}) {
  const { data, isLoading, error } = useAddress({});
  const addresses: AddressItemType[] = data?.data.items || [];
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);
  const isMdUp = useIsMdUp();
  const { createAddress, isCreateAddressLoading } = useAddress({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
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
    <div>
      {isLoading ? (
        <SkeletonLoader className="rounded-lg" width="8rem" height="3rem" />
      ) : error ? (
        <ErrorState message={error.message} />
      ) : (
        <>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
            onClick={() => setModalState(true)}
          >
            <MdOutlineAddLocationAlt className="h-6 w-6" />
            <span>آدرس جدید</span>
          </button>

          {isMdUp ? (
            <Dialog isOpen={modalState} onClose={() => setModalState(false)} title="افزودن آدرس جدید" actions={actions} size="xl">
              <div className="mt-4">
                <AddressForm onSubmit={handleFormSubmit} ref={formRef} />
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
              <AddressForm onSubmit={handleFormSubmit} ref={formRef} />
            </MobileDrawer>
          )}
        </>
      )}
    </div>
  );
}
