import { AddressFormType, type AddressItem } from '@/types/address.type';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';
import React, { useEffect, useRef, useState } from 'react';
import AddressForm from './AddressForm';
import { Option } from './AddressFormDrawer';
import AddressActions from '@/components/ui/DropDownActions';
import Dialog from '@/components/ui/Dialog';
import MobileDrawer from '@/components/MobileDrawer';

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

interface AddressItemProps {
  item: AddressItem;
  selectedAddressId: number | null;
  onSelectAddress: (id: number | null) => void;
}

function AddressItem({ item, selectedAddressId, onSelectAddress }: AddressItemProps) {
  const { deleteAddress, updateAddress, isCreateAddressLoading } = useAddress({});
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedAddressId === item.id;

  useEffect(() => {
    if (!openDropdown) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleFormSubmit = async (values: AddressFormType) => {
    updateAddress(
      item.id,
      values,
      () => {
        setIsOpenDrawer(false);
        setIsOpenDialog(false);
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

  const handleDeleteAddress = (addressId: number) => {
    deleteAddress(addressId);
    if (isSelected) {
      onSelectAddress(null);
    }
  };

  const handleSelect = () => {
    if (isSelected) {
      onSelectAddress(null);
    } else {
      onSelectAddress(item.id);
    }
  };

  const actions = (
    <>
      <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit} disabled={isCreateAddressLoading}>
        {isCreateAddressLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
      </button>
    </>
  );

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm transition-all
          ${isSelected ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
          dark:bg-gray-800 dark:border-gray-700`}
      >
        <span className="absolute right-3 top-5 flex items-center justify-center h-6 w-6">
          <span
            className={`flex items-center justify-center rounded-full border-2 transition-colors
              ${isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:bg-gray-800'}
              h-6 w-6`}
          >
            {isSelected ? (
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
        </span>

        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
          <p className="text-sm text-gray-900 xs:text-base pr-7 dark:text-gray-100 line-clamp-2 sm:line-clamp-2">
            {`${item.province}، ${item.city} - ${item.streetAndAlley} - کد پستی: ${item.postalCode}`}
          </p>
          <div className="relative hidden md:block">
            <AddressActions onDelete={() => handleDeleteAddress(item.id)} onEdit={() => setIsOpenDialog(true)} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">{`گیرنده: ${item.fullName}`}</p>
          <div className="flex items-center gap-x-2 md:hidden">
            <AddressActions onDelete={() => handleDeleteAddress(item.id)} onEdit={() => setIsOpenDrawer(true)} />
          </div>
        </div>
      </div>

      <MobileDrawer
        title="ویرایش آدرس"
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        triggerButton={null}
        footerActions={
          <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit} disabled={isCreateAddressLoading}>
            {isCreateAddressLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
          </button>
        }
      >
        <AddressForm
          provinces={provinces}
          cities={cities}
          onSubmit={handleFormSubmit}
          ref={formRef}
          initialValues={{
            city: item.city,
            postalCode: item.postalCode,
            province: item.province,
            fullName: item.fullName,
            streetAndAlley: item.streetAndAlley,
            unit: item.unit,
            plate: item.plate,
          }}
        />
      </MobileDrawer>
      <Dialog
        title="ویرایش آدرس"
        isOpen={isOpenDialog}
        onOpen={() => setIsOpenDialog(true)}
        onClose={() => setIsOpenDialog(false)}
        actions={actions}
        size="md"
      >
        <div className="mt-4">
          <AddressForm
            provinces={provinces}
            cities={cities}
            onSubmit={handleFormSubmit}
            ref={formRef}
            initialValues={{
              city: item.city,
              postalCode: item.postalCode,
              province: item.province,
              fullName: item.fullName,
              plate: item.plate,
              streetAndAlley: item.streetAndAlley,
              unit: item.unit,
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default AddressItem;
