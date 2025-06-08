import { type AddressItem } from '@/modules/address/types/address.type';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';
import React, { useEffect, useRef, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { MdOutlineEditLocation, MdOutlineWrongLocation } from 'react-icons/md';
import AddressForm from './AddressForm';
import { AddressFormType, Option } from './AddressFormDrawer';
import MobileDrawer from '@/shared/components/MobileDrawer';

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
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
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

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
            {`${item.province}، ${item.city} - ${item.address} - کد پستی: ${item.postalCode}`}
          </p>
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(`address-${item.id}`);
              }}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HiDotsVertical className="h-6 w-6" />
            </button>
            {openDropdown === `address-${item.id}` && (
              <div
                ref={dropdownRef}
                className="absolute left-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <ul className="space-y-1 p-2">
                  <li>
                    <button
                      onClick={() => setIsOpen(true)}
                      type="button"
                      className="flex w-full items-center gap-x-2 rounded-lg px-4 py-2 text-sky-500 hover:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-400/10"
                    >
                      <MdOutlineEditLocation className="h-5 w-5" />
                      <span>ویرایش</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(item.id)}
                      className="flex w-full items-center gap-x-2 rounded-lg px-4 py-2 text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-400/10"
                    >
                      <MdOutlineWrongLocation className="h-5 w-5" />
                      <span>حذف</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">{`گیرنده: ${item.receiverMobile}`}</p>
          <div className="flex items-center gap-x-2 md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAddress(item.id);
              }}
              className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900"
            >
              حذف
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              type="button"
              className="rounded-md bg-sky-100 px-3 py-1 text-sm text-sky-600 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-400 dark:hover:bg-sky-900"
            >
              ویرایش
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        title="ویرایش آدرس"
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
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
            address: item.address,
            city: item.city,
            description: item.description,
            postalCode: item.postalCode,
            province: item.province,
            receiverMobile: item.receiverMobile,
          }}
        />
      </MobileDrawer>
    </div>
  );
}

export default AddressItem;
