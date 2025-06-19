'use client';

import React, { useState } from 'react';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import AddressItem from './AddressItem';
import { AddressFormType } from '@/types/addressType';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import { GrLocation } from 'react-icons/gr';
import { Option } from '@/components/checkout/AddressSection';

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
  const { data, isLoading, error } = useAddress({});
  const { deleteAddress, updateAddress, isCreateAddressLoading } = useAddress({});

  const addresses = data?.data.items || [];

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDrawer, setIsDrawer] = useState(false);

  const openEdit = (id: number, useDrawer: boolean) => {
    setEditingId(id);
    setIsDrawer(useDrawer);
  };

  const closeEdit = () => {
    setEditingId(null);
  };

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

  const handleDeleteAddress = (addressId: number) => {
    deleteAddress(addressId);
  };

  return (
    <>
      <div className="mb-8 space-y-4">
        {isLoading || isCreateAddressLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : addresses.length === 0 ? (
          <EmptyState icon={<GrLocation className="w-full h-full" />} />
        ) : (
          <fieldset className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              {addresses?.map((item) => (
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
        )}
      </div>
    </>
  );
}
