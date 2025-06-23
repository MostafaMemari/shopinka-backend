import React, { useRef, useState } from 'react';
import { AddressFormType, type AddressItem as AddressItemType } from '@/types/addressType';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import useIsMdUp from '@/hooks/useIsMdUp';

import AddressActions from '@/components/ui/DropDownActions';
import Dialog from '@/components/ui/Dialog';
import MobileDrawer from '@/components/ui/MobileDrawer';
import AddressForm from './AddressForm';

interface AddressItemProps {
  item: AddressItemType;
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ item, selectedAddressId, onSelectAddress }) => {
  const { deleteAddress, updateAddress, isCreateAddressLoading } = useAddress({});
  const formRef = useRef<HTMLFormElement>(null);
  const [modalState, setModalState] = useState(false);

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

  const handleDeleteAddress = () => {
    deleteAddress(item.id);
  };

  const handleSelect = () => {
    if (!isSelected) onSelectAddress(item.id);
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
    <button
      className="btn-primary w-full py-3 text-base font-semibold rounded-lg transition focus:ring-2 focus:ring-primary-400 disabled:opacity-60"
      type="button"
      onClick={triggerFormSubmit}
      disabled={isCreateAddressLoading}
    >
      {isCreateAddressLoading ? 'در حال ثبت...' : 'تأیید و ادامه'}
    </button>
  );

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`
          relative block cursor-pointer rounded-xl border p-5 shadow-sm transition-all
          ${isSelected ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
          dark:bg-gray-800 dark:border-gray-700
        `}
        aria-selected={isSelected}
        tabIndex={0}
        role="button"
      >
        <div className="absolute top-4 left-4 z-10">
          <div className="hidden md:block">
            <AddressActions onDelete={handleDeleteAddress} onEdit={() => setModalState(true)} />
          </div>
          <div className="md:hidden">
            <AddressActions onDelete={handleDeleteAddress} onEdit={() => setModalState(true)} />
          </div>
        </div>

        {/* رادیو انتخاب آدرس */}
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

        <div className="flex flex-col gap-2 pr-9">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base text-gray-800 dark:text-white">
              {item.province}
              {item.city && `، ${item.city}`}
              {item.streetAndAlley && ` - ${item.streetAndAlley}`}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
            {item.plate && <span>پلاک: {item.plate}</span>}
            {item.unit && <span>واحد: {item.unit}</span>}
            {item.postalCode && <span>کد پستی: {item.postalCode}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>گیرنده:</span>
            <span className="font-medium">{item.fullName}</span>
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
          <div className="py-2">
            <AddressForm onSubmit={handleFormSubmit} ref={formRef} initialValues={formInitialValues} />
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
          <div className="py-2">
            <AddressForm onSubmit={handleFormSubmit} ref={formRef} initialValues={formInitialValues} />
          </div>
        </MobileDrawer>
      )}
    </div>
  );
};

export default AddressItem;
