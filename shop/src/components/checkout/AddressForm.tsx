'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import SelectInput from '@/components/ui/SelectInput';
import { AddressFormType } from '@/types/address.type';
import { Option } from './AddressFormDialog';

interface Cities {
  [key: string]: Option[];
}

interface AddressProps {
  provinces: Option[];
  cities: Cities;
  onSubmit: (values: AddressFormType) => Promise<void>;
  initialValues?: AddressFormType;
  className?: string;
}

const AddressForm = forwardRef<HTMLFormElement, AddressProps>(
  (
    {
      provinces,
      cities,
      onSubmit,
      initialValues = {
        fullName: '',
        province: '',
        city: '',
        plate: '',
        unit: '',
        postalCode: '',
        streetAndAlley: '',
      },
      className = '',
    },
    ref,
  ) => {
    const [selectedProvince, setSelectedProvince] = useState(initialValues.province);

    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        fullName: Yup.string().trim().required('نام و نام خانوادگی الزامی است'),
        province: Yup.string().trim().required('استان الزامی است'),
        city: Yup.string().trim().required('شهر الزامی است'),
        plate: Yup.string().trim().required('پلاک الزامی است'),
        streetAndAlley: Yup.string().trim().required('خیابان و کوچه الزامی است'),
        unit: Yup.string().trim().optional(),
        postalCode: Yup.string()
          .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
          .optional(),
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
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-1 p-4 text-right ${className}`.trim()} dir="rtl">
        <div className="grid grid-cols-1 gap-4">
          <TextInput id="fullName" name="fullName" isRequired label="نام و نام خانوادگی تحویل گیرنده" formik={formik} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            id="province"
            name="province"
            label="استان"
            formik={formik}
            options={provinces}
            placeholder="انتخاب کنید"
            isRequired
            onChange={handleProvinceChange}
          />
          <SelectInput
            id="city"
            name="city"
            label="شهر"
            formik={formik}
            options={cities[selectedProvince] || []}
            placeholder=""
            isRequired
            isDisabled={!selectedProvince}
            key={selectedProvince}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput id="plate" name="plate" label="پلاک" isRequired formik={formik} />
          <TextInput id="streetAndAlley" name="streetAndAlley" isRequired label="خیابان و کوچه" formik={formik} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput id="unit" name="unit" label="واحد" formik={formik} />
          <TextInput id="postalCode" name="postalCode" label="کدپستی" formik={formik} />
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
      </form>
    );
  },
);

export default AddressForm;
