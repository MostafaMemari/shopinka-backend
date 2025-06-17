'use client';

import { useRef, useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { useAddress } from '@/hooks/reactQuery/useAddress';
import AddressForm from './AddressForm';
import Dialog from '@/components/ui/Dialog';
import { AddressFormType } from '@/types/address.type';

export interface Option {
  value: string;
  label: string;
}

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

const AddressFormDialog = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createAddress, isCreateAddressLoading } = useAddress({});

  const handleFormSubmit = async (values: AddressFormType) => {
    createAddress(
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

  const icon = (
    <div className="bg-primary/10 w-full rounded-full">
      <MdOutlineAddLocationAlt className="h-6 w-6 text-primary" />
    </div>
  );

  const actions = (
    <>
      <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit} disabled={isCreateAddressLoading}>
        {isCreateAddressLoading ? 'در حال ثبت' : 'تأیید و ادامه'}
      </button>
    </>
  );

  return (
    <div>
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <MdOutlineAddLocationAlt className="h-6 w-6" />
        <span>آدرس جدید</span>
      </button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="افزودن آدرس جدید" icon={icon} actions={actions} size="xl">
        <div className="mt-4">
          <AddressForm provinces={provinces} cities={cities} onSubmit={handleFormSubmit} ref={formRef} />
        </div>
      </Dialog>
    </div>
  );
};

export default AddressFormDialog;
