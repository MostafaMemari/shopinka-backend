'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, forwardRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextInput from '@/shared/components/ui/TextInput';
import SelectInput from '@/shared/components/ui/SelectInput';
import { Option } from './AddressFormDrawer';
import { createAddress } from '@/shared/services/address.api';
import { QueryKeys } from '@/shared/types/query-keys';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';

interface Cities {
  [key: string]: Option[];
}

interface AddressFormProps {
  provinces: Option[];
  cities: Cities;
  initialValues?: {
    province: string;
    city: string;
    address: string;
    postalCode: string;
    receiverMobile: string;
    description: string;
  };
  className?: string;
}

const AddressForm = forwardRef<HTMLFormElement, AddressFormProps>(
  (
    {
      provinces,
      cities,
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
    const queryClient = useQueryClient();
    const [selectedProvince, setSelectedProvince] = useState(initialValues.province);
    const { createAddressMutation } = useAddress({});

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
        try {
          createAddressMutation(values);
          console.log('آدرس ثبت شد:', values);
          formik.resetForm();
        } catch (error) {
          console.error('خطا در ارسال فرم:', error);
        }
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
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-6 p-4 text-right ${className}`} dir="rtl">
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <TextInput id="address" name="address" label="آدرس" type="textarea" formik={formik} rows={3} />
        <TextInput id="postalCode" name="postalCode" label="کدپستی" formik={formik} />
        <TextInput id="receiverMobile" name="receiverMobile" label="شماره موبایل گیرنده" formik={formik} />
        <TextInput id="description" name="description" label="توضیحات" type="textarea" formik={formik} rows={3} />
      </form>
    );
  },
);

AddressForm.displayName = 'AddressForm';

export default AddressForm;
