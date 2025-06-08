'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
import TextInput from '@/shared/components/ui/TextInput';
import SelectInput from '@/shared/components/ui/SelectInput';
import { Option, AddressFormType } from './AddressFormDrawer';

interface Cities {
  [key: string]: Option[];
}

interface AddressFormProps {
  provinces: Option[];
  cities: Cities;
  onSubmit: (values: AddressFormType) => Promise<void>;
  initialValues?: AddressFormType;
  className?: string;
}

const AddressForm = forwardRef<HTMLFormElement, AddressFormProps>(
  (
    {
      provinces,
      cities,
      onSubmit,
      initialValues = {
        province: '',
        city: '',
        address: '',
        postalCode: '',
        receiverMobile: '',
        description: '',
      },
      className = '',
    },
    ref,
  ) => {
    const [selectedProvince, setSelectedProvince] = useState(initialValues.province);

    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        province: Yup.string().required('استان الزامی است'),
        city: Yup.string().required('شهر الزامی است'),
        address: Yup.string().required('آدرس الزامی است'),
        postalCode: Yup.string()
          .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
          .optional(),
        receiverMobile: Yup.string()
          .matches(/^09\d{9}$/, 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود')
          .optional(),
        description: Yup.string().optional(),
      }),
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });

    const handleProvinceChange = (selectedOption: Option | null) => {
      if (!selectedOption) return;

      const value = selectedOption.value;
      setSelectedProvince(value);
      formik.setFieldValue('province', value);
      formik.setFieldValue('city', '');
    };

    return (
      <form
        ref={ref}
        onSubmit={formik.handleSubmit}
        className={`space-y-6 p-4 text-right ${className} max-h-[70vh] overflow-y-auto`}
        dir="rtl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectInput
            id="province"
            name="province"
            label="استان"
            formik={formik}
            options={provinces}
            placeholder="انتخاب کنید"
            onChange={handleProvinceChange}
          />
          <SelectInput
            id="city"
            name="city"
            label="شهر"
            formik={formik}
            options={cities[selectedProvince] || []}
            placeholder=""
            isDisabled={!selectedProvince}
            key={selectedProvince}
          />
          <TextInput id="postalCode" name="postalCode" label="کدپستی" formik={formik} className="col-span-1" />
          <TextInput id="receiverMobile" name="receiverMobile" label="شماره موبایل گیرنده" formik={formik} className="col-span-1" />
          <TextInput
            id="address"
            name="address"
            label="آدرس"
            type="textarea"
            formik={formik}
            rows={3}
            className="col-span-1 lg:col-span-2"
          />
          <TextInput
            id="description"
            name="description"
            label="توضیحات"
            type="textarea"
            formik={formik}
            rows={3}
            className="col-span-1 lg:col-span-3"
          />
        </div>
      </form>
    );
  },
);

AddressForm.displayName = 'AddressForm';

export default AddressForm;
