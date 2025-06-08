import { type AddressItem } from '@/modules/address/types/address.type';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';
import React, { useRef, useState } from 'react';
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

  const isSelected = selectedAddressId === item.id;

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
      onSelectAddress(null); // اگه آدرس حذف‌شده انتخاب شده بود، انتخاب رو پاک کن
    }
  };

  const handleSelect = () => {
    if (isSelected) {
      onSelectAddress(null); // لغو انتخاب
    } else {
      onSelectAddress(item.id); // انتخاب این آدرس
    }
  };

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm transition-all 
          ${isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
          dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
          <p className="line-clamp-2 text-sm text-gray-900 xs:text-base sm:line-clamp-1 dark:text-gray-100">
            {`${item.province}، ${item.city} - ${item.address} - کد پستی: ${item.postalCode}`}
          </p>
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // جلوگیری از trigger شدن handleSelect
                toggleDropdown(`address-${item.id}`);
              }}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HiDotsVertical className="h-6 w-6" />
            </button>
            {openDropdown === `address-${item.id}` && (
              <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
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
                e.stopPropagation(); // جلوگیری از trigger شدن handleSelect
                handleDeleteAddress(item.id);
              }}
              className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900"
            >
              حذف
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // جلوگیری از trigger شدن handleSelect
                setIsOpen(true);
              }}
              type="button"
              className="rounded-md bg-sky-100 px-3 py-1 text-sm text-sky-600 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-400 dark:hover:bg-sky-900"
            >
              ویرایش
            </button>
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-2 left-2 text-primary">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
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
