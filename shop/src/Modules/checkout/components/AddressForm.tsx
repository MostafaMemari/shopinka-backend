'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

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
      //   await onSubmit(values);
      console.log(values);
    },
  });

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProvince(value);
    formik.setFieldValue('province', value);
    formik.setFieldValue('city', '');
  };

  return (
    <form onSubmit={formik.handleSubmit} className={`space-y-4 p-4 text-right ${className}`} dir="rtl">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          نام و نام خانوادگی
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          کدپستی
        </label>
        <input
          id="postalCode"
          name="postalCode"
          type="text"
          className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.postalCode && formik.errors.postalCode && <p className="text-red-500 text-xs mt-1">{formik.errors.postalCode}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            استان
          </label>
          <select
            id="province"
            name="province"
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
            value={formik.values.province}
            onChange={handleProvinceChange}
            onBlur={formik.handleBlur}
          >
            <option value="">انتخاب کنید</option>
            {provinces.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          {formik.touched.province && formik.errors.province && <p className="text-red-500 text-xs mt-1">{formik.errors.province}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            شهر
          </label>
          <select
            id="city"
            name="city"
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!selectedProvince}
          >
            <option value="">ابتدا استان را انتخاب کنید</option>
            {(cities[selectedProvince] || []).map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {formik.touched.city && formik.errors.city && <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          خیابان
        </label>
        <textarea
          id="street"
          name="street"
          className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
          rows={3}
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.street && formik.errors.street && <p className="text-red-500 text-xs mt-1">{formik.errors.street}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            واحد
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
            value={formik.values.unit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.unit && formik.errors.unit && <p className="text-red-500 text-xs mt-1">{formik.errors.unit}</p>}
        </div>

        <div>
          <label htmlFor="plaque" className="block text-sm font-medium text-gray-700">
            پلاک
          </label>
          <input
            id="plaque"
            name="plaque"
            type="text"
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary-300"
            value={formik.values.plaque}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.plaque && formik.errors.plaque && <p className="text-red-500 text-xs mt-1">{formik.errors.plaque}</p>}
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
