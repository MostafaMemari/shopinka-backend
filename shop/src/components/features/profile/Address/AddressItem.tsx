import React, { useRef } from 'react';
import AddressActions from '@/components/ui/DropDownActions';
import MobileDrawer from '@/components/ui/MobileDrawer';
import AddressForm from '@/components/features/checkout/AddressForm';
import Dialog from '@/components/ui/Dialog';
import { AddressFormType } from '@/types/addressType';

type AddressItemProps = {
  item: any;
  isEditing: boolean;
  isDrawer: boolean;
  onEdit: (useDrawer: boolean) => void;
  onCloseEdit: () => void;
  onDelete: () => void;
  onSubmit: (values: AddressFormType) => Promise<void>;
  isLoading: boolean;
};

const AddressItem: React.FC<AddressItemProps> = ({ item, isEditing, isDrawer, onEdit, onCloseEdit, onDelete, onSubmit, isLoading }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const triggerFormSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const ConfirmButton = (
    <button
      className="btn-primary w-full py-3 text-base font-semibold rounded-lg transition focus:ring-2 focus:ring-primary-400 disabled:opacity-60"
      type="button"
      onClick={triggerFormSubmit}
      disabled={isLoading}
    >
      {isLoading ? 'در حال ثبت...' : 'تأیید و ادامه'}
    </button>
  );

  const AddressDetails = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full" />
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
  );

  const ActionsMenu = (
    <div className="absolute top-4 left-4 z-10">
      <div className="hidden md:block">
        <AddressActions onDelete={onDelete} onEdit={() => onEdit(false)} />
      </div>
      <div className="md:hidden">
        <AddressActions onDelete={onDelete} onEdit={() => onEdit(true)} />
      </div>
    </div>
  );

  const AddressFormWrapper = (
    <AddressForm
      onSubmit={onSubmit}
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
  );

  return (
    <div
      className={`
        relative rounded-xl p-5 border transition-shadow
        ${isEditing ? 'bg-primary/5 border-primary shadow-lg' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md'}
      `}
      key={item.id}
    >
      {ActionsMenu}
      {AddressDetails}
      <MobileDrawer
        title="ویرایش آدرس"
        isOpen={isEditing && isDrawer}
        onOpen={() => onEdit(true)}
        onClose={onCloseEdit}
        triggerButton={null}
        footerActions={ConfirmButton}
      >
        <div className="py-2">{AddressFormWrapper}</div>
      </MobileDrawer>
      <Dialog
        title="ویرایش آدرس"
        isOpen={isEditing && !isDrawer}
        onOpen={() => onEdit(false)}
        onClose={onCloseEdit}
        actions={ConfirmButton}
        size="md"
      >
        <div className="py-2">{AddressFormWrapper}</div>
      </Dialog>
    </div>
  );
};

export default AddressItem;
