import { AddressFormType, type AddressItem as AddressItemType } from '@/types/addressType';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import React, { useRef, useState } from 'react';

import AddressActions from '@/components/ui/DropDownActions';
import Dialog from '@/components/ui/Dialog';
import MobileDrawer from '@/components/ui/MobileDrawer';
import AddressForm from './AddressForm';
import { Option } from './AddressSection';
import useIsMdUp from '@/hooks/useIsMdUp';

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

interface AddressItemProps {
  item: AddressItemType;
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ item, selectedAddressId, onSelectAddress }) => {
  const { deleteAddress, updateAddress, isCreateAddressLoading } = useAddress({});
  const formRef = useRef<HTMLFormElement>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  const isMdUp = useIsMdUp();

  const isSelected = selectedAddressId === item.id;

  const handleFormSubmit = async (values: AddressFormType) => {
    updateAddress(
      item.id,
      values,
      () => {
        setModalState(false);
        formRef.current?.reset();
      },
      (error) => {
        console.error('خطا در ارسال فرم:', error);
      },
    );
  };

  const triggerFormSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleDeleteAddress = (addressId: number) => {
    deleteAddress(addressId);
  };

  const handleSelect = () => {
    if (!isSelected) {
      onSelectAddress(item.id);
    }
  };

  const formInitialValues = {
    city: item.city,
    postalCode: item.postalCode,
    province: item.province,
    fullName: item.fullName,
    streetAndAlley: item.streetAndAlley,
    unit: item.unit,
    plate: item.plate,
  };

  const ConfirmButton = (
    <button className="btn-primary w-full py-3 text-sm" type="button" onClick={triggerFormSubmit} disabled={isCreateAddressLoading}>
      {isCreateAddressLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
    </button>
  );

  const addressSummary = `${item.province}، ${item.city} - ${item.streetAndAlley} - کد پستی: ${item.postalCode}`;

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm transition-all
          ${isSelected ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
          dark:bg-gray-800 dark:border-gray-700
        `}
        aria-selected={isSelected}
        tabIndex={0}
        role="button"
      >
        <span className="absolute right-3 top-5 flex items-center justify-center h-6 w-6">
          <span
            className={`flex items-center justify-center rounded-full border-2 transition-colors
              ${isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:bg-gray-800'}
              h-6 w-6`}
          >
            {isSelected && (
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </span>

        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
          <p className="text-sm text-gray-900 xs:text-base pr-7 dark:text-gray-100 line-clamp-2">{addressSummary}</p>

          <div className="relative hidden md:block">
            <AddressActions onDelete={() => handleDeleteAddress(item.id)} onEdit={() => setModalState(true)} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">{`گیرنده: ${item.fullName}`}</p>
          <div className="flex items-center gap-x-2 md:hidden">
            <AddressActions onDelete={() => handleDeleteAddress(item.id)} onEdit={() => setModalState(true)} />
          </div>
        </div>
      </div>

      {isMdUp ? (
        <Dialog
          title="ویرایش آدرس"
          isOpen={modalState}
          onOpen={() => setModalState(true)}
          onClose={() => setModalState(false)}
          actions={ConfirmButton}
          size="md"
        >
          <div className="mt-4">
            <AddressForm
              provinces={provinces}
              cities={cities}
              onSubmit={handleFormSubmit}
              ref={formRef}
              initialValues={formInitialValues}
            />
          </div>
        </Dialog>
      ) : (
        <MobileDrawer
          title="ویرایش آدرس"
          isOpen={modalState}
          onOpen={() => setModalState(true)}
          onClose={() => setModalState(false)}
          triggerButton={null}
          footerActions={ConfirmButton}
        >
          <AddressForm provinces={provinces} cities={cities} onSubmit={handleFormSubmit} ref={formRef} initialValues={formInitialValues} />
        </MobileDrawer>
      )}
    </div>
  );
};

export default AddressItem;
