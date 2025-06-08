'use client';

import MobileDrawer from '@/shared/components/MobileDrawer';
import AddressForm from './AddressForm';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { useRef, useState } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface AddressFormDrawerProps {
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

const provinces = [
  { value: 'tehran', label: 'تهران' },
  { value: 'isfahan', label: 'اصفهان' },
];

const cities = {
  tehran: [
    { value: 'tehran', label: 'تهران' },
    { value: 'rey', label: 'ری' },
  ],
  isfahan: [
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'kashan', label: 'کاشان' },
  ],
};

const AddressFormDrawer: React.FC<AddressFormDrawerProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleFormSubmit = async (values: {
    fullName: string;
    postalCode: string;
    province: string;
    city: string;
    street: string;
    unit: string;
    plaque: string;
  }) => {
    await onSubmit(values);
    setIsOpen(false);
  };

  return (
    <div>
      <MobileDrawer
        title="افزودن آدرس جدید"
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        triggerButton={
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <MdOutlineAddLocationAlt className="h-6 w-6" />
            <span>آدرس جدید</span>
          </button>
        }
        footerActions={
          <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit}>
            تأیید و ادامه
          </button>
        }
      >
        <AddressForm provinces={provinces} cities={cities} onSubmit={handleFormSubmit} ref={formRef} />
      </MobileDrawer>
    </div>
  );
};

export default AddressFormDrawer;
