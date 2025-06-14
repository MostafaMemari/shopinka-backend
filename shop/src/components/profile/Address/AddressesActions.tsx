'use client';

import React, { useState } from 'react';
import { MdOutlineEditLocation } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import CartStatus from '@/components/CartStatus copy';
import AddressFormDialog from '@/components/checkout/AddressFormDialog';
import AddressFormDrawer, { Option } from '@/components/checkout/AddressFormDrawer';
import AddressItem from './AddressItem';
import { AddressFormType } from '@/types/address.type';
import DashboardHeader from '../DashboardHeader';

const provinces: Option[] = [
  { value: 'tehran', label: 'تهران' },
  { value: 'isfahan', label: 'اصفهان' },
];

const cities: Record<string, Option[]> = {
  tehran: [
    { value: 'tehran', label: 'تهران' },
    { value: 'rey', label: 'ری' },
  ],
  isfahan: [
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'kashan', label: 'کاشان' },
  ],
};

export default function AddressSection() {
  const { addressItems, isLoading, error } = useAddress({});
  const { deleteAddress, updateAddress, isCreateAddressLoading } = useAddress({});

  // State for current edit dialog/drawer per address
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDrawer, setIsDrawer] = useState(false);

  // Open edit for specific address (per device)
  const openEdit = (id: number, useDrawer: boolean) => {
    setEditingId(id);
    setIsDrawer(useDrawer);
  };

  // Close edit
  const closeEdit = () => {
    setEditingId(null);
  };

  // Handle update
  const handleFormSubmit = async (values: AddressFormType) => {
    if (editingId != null) {
      updateAddress(
        editingId,
        values,
        () => {
          closeEdit();
        },
        (error) => {
          console.error('خطا در ارسال فرم:', error);
        },
      );
    }
  };

  // Handle delete
  const handleDeleteAddress = (addressId: number) => {
    deleteAddress(addressId);
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
        <div className="col-span-12 lg:col-span-9">
          <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
            <DashboardHeader title="آدرس تحویل سفارش" />
            <>
              <div className="hidden md:block">
                <AddressFormDialog />
              </div>
              <div className="md:hidden">
                <AddressFormDrawer />
              </div>
            </>
          </div>
          <fieldset className="grid grid-cols-1 gap-4">
            <legend className="sr-only">Address Options</legend>
            <div className="space-y-4">
              {addressItems?.map((item) => (
                <AddressItem
                  key={item.id}
                  item={item}
                  provinces={provinces}
                  cities={cities}
                  isEditing={editingId === item.id}
                  isDrawer={isDrawer}
                  onEdit={(useDrawer) => openEdit(item.id, useDrawer)}
                  onCloseEdit={closeEdit}
                  onDelete={() => handleDeleteAddress(item.id)}
                  onSubmit={handleFormSubmit}
                  isLoading={isCreateAddressLoading}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
}
