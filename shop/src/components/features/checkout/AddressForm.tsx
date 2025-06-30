'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import SelectInput from '@/components/ui/SelectInput';
import { AddressFormType } from '@/types/addressType';
import { provinces } from '@/data/provinces';
import { cities } from '@/data/cities';

interface AddressProps {
  onSubmit: (values: AddressFormType) => Promise<void>;
  initialValues?: AddressFormType;
  className?: string;
}

const AddressForm = forwardRef<HTMLFormElement, AddressProps>(
  (
    {
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
    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

    useEffect(() => {
      if (initialValues.province) {
        const provinceId = provinces.find((p) => p.name === initialValues.province)?.id || null;
        setSelectedProvinceId(provinceId);
      }
    }, [initialValues.province]);

    const filteredCities = useMemo(() => {
      if (selectedProvinceId === null) return [];
      return cities.filter((city) => city.province === selectedProvinceId);
    }, [selectedProvinceId]);

    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        fullName: Yup.string().trim().required('نام و نام خانوادگی الزامی است'),
        province: Yup.string().required('استان الزامی است'),
        city: Yup.string().required('شهر الزامی است'),
        plate: Yup.string().required('پلاک الزامی است'),
        streetAndAlley: Yup.string().required('خیابان و کوچه الزامی است'),
        unit: Yup.string().optional(),
        postalCode: Yup.string()
          .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
          .optional(),
      }),
      onSubmit: async (values) => {
        await onSubmit(values);
      },
      validateOnChange: false,
      validateOnBlur: true,
    });

    return (
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-1 p-4 text-right ${className}`} dir="rtl">
        <div className="grid grid-cols-1 gap-4">
          <TextInput id="fullName" name="fullName" isRequired label="نام و نام خانوادگی تحویل گیرنده" formik={formik} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            id="province"
            name="province"
            label="استان"
            formik={formik}
            options={provinces.map((p) => ({ value: p.name, label: p.name }))}
            placeholder="انتخاب کنید"
            isRequired
            onChange={(selected) => {
              const value = selected?.value || '';
              const provinceId = provinces.find((p) => p.name === value)?.id || null;
              setSelectedProvinceId(provinceId);
              formik.setFieldValue('province', value);
              formik.setFieldValue('city', '');
              formik.setFieldTouched('city', false);
            }}
          />

          <SelectInput
            key={`city-${selectedProvinceId}`}
            id="city"
            name="city"
            label="شهر"
            formik={formik}
            options={filteredCities.map((c) => ({ value: c.name, label: c.name }))}
            placeholder="انتخاب کنید"
            isRequired
            isDisabled={!selectedProvinceId}
            onChange={(selected) => {
              const value = selected?.value || '';
              formik.setFieldValue('city', value);
            }}
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
      </form>
    );
  },
);

AddressForm.displayName = 'AddressForm';

export default AddressForm;
