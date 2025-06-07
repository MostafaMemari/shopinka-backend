'use client';

import MobileDrawer from '@/shared/components/MobileDrawer';
import AddressForm from './AddressForm';
import { MdOutlineAddLocationAlt } from 'react-icons/md';

interface Option {
  value: string;
  label: string;
}

interface Cities {
  [key: string]: Option[];
}

interface AddressFormDrawerProps {
  provinces: Option[];
  cities: Cities;
  onSubmit: (values: {
    fullName: string;
    postalCode: string;
    province: string;
    city: string;
    street: string;
    unit: string;
    plaque: string;
  }) => void;
}

const AddressFormDrawer: React.FC<AddressFormDrawerProps> = ({ provinces, cities, onSubmit }) => {
  return (
    <div>
      <MobileDrawer
        title="افزودن آدرس جدید"
        triggerButton={
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer">
            <MdOutlineAddLocationAlt className="h-6 w-6" />
            <span>آدرس جدید</span>
          </button>
        }
        footerActions={
          <button className="btn-primary w-full py-3 text-sm" type="button">
            تایید و ادامه
          </button>
        }
      >
        <AddressForm
          provinces={provinces}
          cities={cities}
          onSubmit={async (values) => {
            await onSubmit(values);
            console.log('آدرس ثبت شد:', values);
          }}
          className="pb-[100px]"
        />
      </MobileDrawer>
    </div>
  );
};

export default AddressFormDrawer;
