import React, { useRef } from 'react';
import AddressActions from '@/components/ui/DropDownActions';
import MobileDrawer from '@/components/ui/MobileDrawer';
import AddressForm from '@/components/checkout/AddressForm';
import Dialog from '@/components/ui/Dialog';
import { AddressFormType } from '@/types/addressType';
import { Option } from './CreateAddress';

type AddressItemProps = {
  item: any;
  provinces: Option[];
  cities: Record<string, Option[]>;
  isEditing: boolean;
  isDrawer: boolean;
  onEdit: (useDrawer: boolean) => void;
  onCloseEdit: () => void;
  onDelete: () => void;
  onSubmit: (values: AddressFormType) => Promise<void>;
  isLoading: boolean;
};

const AddressItem: React.FC<AddressItemProps> = ({
  item,
  provinces,
  cities,
  isEditing,
  isDrawer,
  onEdit,
  onCloseEdit,
  onDelete,
  onSubmit,
  isLoading,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const triggerFormSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const ConfirmButton = (
    <button className="btn-primary w-full py-3 text-sm" type="button" onClick={triggerFormSubmit} disabled={isLoading}>
      {isLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
    </button>
  );

  return (
    <div
      className={`relative rounded-lg p-4 transition-shadow border dark:border-gray-700 ${
        isEditing ? 'shadow-lg border-primary dark:border-primary' : 'hover:shadow-md'
      } bg-white dark:bg-gray-900`}
      key={item.id}
    >
      <div className="flex items-center justify-between gap-x-4 mb-1">
        <div className="flex-1">
          <p className="font-semibold text-base text-gray-800 dark:text-white mb-1 line-clamp-2">
            {`${item.province}، ${item.city} - ${item.streetAndAlley}`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">کد پستی: {item.postalCode}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            گیرنده: <span className="font-medium">{item.fullName}</span>
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-x-2">
          <div className="hidden md:block">
            <AddressActions onDelete={onDelete} onEdit={() => onEdit(false)} />
          </div>
          <div className="md:hidden">
            <AddressActions onDelete={onDelete} onEdit={() => onEdit(true)} />
          </div>
        </div>
      </div>
      {(item.unit || item.plate) && (
        <p className="text-xs text-gray-400 mt-2">
          {item.plate && `پلاک: ${item.plate}`} {item.unit && `واحد: ${item.unit}`}
        </p>
      )}

      <MobileDrawer
        title="ویرایش آدرس"
        isOpen={isEditing && isDrawer}
        onOpen={() => onEdit(true)}
        onClose={onCloseEdit}
        triggerButton={null}
        footerActions={ConfirmButton}
      >
        <AddressForm
          provinces={provinces}
          cities={cities}
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
      </MobileDrawer>

      <Dialog
        title="ویرایش آدرس"
        isOpen={isEditing && !isDrawer}
        onOpen={() => onEdit(false)}
        onClose={onCloseEdit}
        actions={ConfirmButton}
        size="md"
      >
        <div className="mt-4">
          <AddressForm
            provinces={provinces}
            cities={cities}
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
        </div>
      </Dialog>
    </div>
  );
};

export default AddressItem;
