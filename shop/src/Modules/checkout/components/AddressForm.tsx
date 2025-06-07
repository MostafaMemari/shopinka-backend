'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import TextInput from '@/shared/components/ui/TextInput';
import SelectInput from '@/shared/components/ui/SelectInput';
import { Option } from './AddressFormDrawer';

interface Cities {
  [key: string]: Option[];
}

interface AddressFormProps {
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
  initialValues?: {
    fullName?: string;
    postalCode?: string;
    province?: string;
    city?: string;
    street?: string;
    unit?: string;
    plaque?: string;
  };
  className?: string;
}

// کامپوننت اصلی فرم
const AddressForm: React.FC<AddressFormProps> = ({
  provinces,
  cities,
  onSubmit,
  initialValues = {
    fullName: '',
    postalCode: '',
    province: '',
    city: '',
    street: '',
    unit: '',
    plaque: '',
  },
  className = '',
}) => {
  const [selectedProvince, setSelectedProvince] = useState(initialValues.province || '');

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string().required('نام و نام خانوادگی الزامی است'),
      postalCode: Yup.string()
        .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
        .required('کدپستی الزامی است'),
      province: Yup.string().required('استان الزامی است'),
      city: Yup.string().required('شهر الزامی است'),
      street: Yup.string().required('خیابان الزامی است'),
      unit: Yup.string(),
      plaque: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values);
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
    <form onSubmit={formik.handleSubmit} className={`space-y-6 p-4 text-right ${className}`} dir="rtl">
      <TextInput id="fullName" name="fullName" label="نام و نام خانوادگی" formik={formik} />
      <TextInput id="postalCode" name="postalCode" label="کدپستی" formik={formik} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          placeholder="ابتدا استان را انتخاب کنید"
          isDisabled={!selectedProvince}
        />
      </div>
      <TextInput id="street" name="street" label="خیابان" type="textarea" formik={formik} rows={3} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput id="unit" name="unit" label="واحد" formik={formik} />
        <TextInput id="plaque" name="plaque" label="پلاک" formik={formik} />
      </div>
      {/* <button type="submit" className="w-full rounded-lg bg-emerald-500 text-white p-2.5 hover:bg-emerald-600 transition-colors">
        ارسال
      </button> */}
    </form>
  );
};

export default AddressForm;
