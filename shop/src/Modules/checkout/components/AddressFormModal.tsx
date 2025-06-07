'use client';

import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';

// تعریف نوع برای گزینه‌ها
interface Option {
  value: string;
  label: string;
}

// تعریف نوع برای شهرها
interface Cities {
  [key: string]: Option[];
}

// لیست نمونه برای dropdownها
const provinces: Option[] = [
  { value: 'tehran', label: 'تهران' },
  { value: 'isfahan', label: 'اصفهان' },
];

const cities: Cities = {
  tehran: [
    { value: 'tehran', label: 'تهران' },
    { value: 'rey', label: 'ری' },
  ],
  isfahan: [
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'kashan', label: 'کاشان' },
  ],
};

const AddressFormModal: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      postalCode: '',
      province: '',
      city: '',
      street: '',
      unit: '',
      plaque: '',
    },
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
      console.log('فرم ارسال شد:', values);
      await Swal.fire({
        title: 'موفقیت',
        text: 'آدرس با موفقیت اضافه شد!',
        icon: 'success',
        confirmButtonText: 'بستن',
        customClass: {
          popup: 'bg-white rounded-lg shadow-lg',
          title: 'font-bold text-lg',
          confirmButton: 'bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded',
        },
      });
    },
  });

  const showForm = () => {
    Swal.fire({
      title: 'افزودن آدرس جدید',
      html: `
        <form id="address-form" class="space-y-4 p-4 text-right" dir="rtl">
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
            <input id="fullName" name="fullName" type="text" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" />
            <p class="text-red-500 text-xs mt-1">${formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ''}</p>
          </div>
          <div>
            <label for="postalCode" class="block text-sm font-medium text-gray-700">کدپستی</label>
            <input id="postalCode" name="postalCode" type="text" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" />
            <p class="text-red-500 text-xs mt-1">${formik.touched.postalCode && formik.errors.postalCode ? formik.errors.postalCode : ''}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="province" class="block text-sm font-medium text-gray-700">استان</label>
              <select id="province" name="province" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300">
                <option value="">انتخاب کنید</option>
                ${provinces.map((p) => `<option value="${p.value}">${p.label}</option>`).join('')}
              </select>
              <p class="text-red-500 text-xs mt-1">${formik.touched.province && formik.errors.province ? formik.errors.province : ''}</p>
            </div>
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">شهر</label>
              <select id="city" name="city" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" ${selectedProvince ? '' : 'disabled'}>
                <option value="">ابتدا استان را انتخاب کنید</option>
                ${(cities[selectedProvince] || []).map((c) => `<option value="${c.value}">${c.label}</option>`).join('')}
              </select>
              <p class="text-red-500 text-xs mt-1">${formik.touched.city && formik.errors.city ? formik.errors.city : ''}</p>
            </div>
          </div>
          <div>
            <label for="street" class="block text-sm font-medium text-gray-700">خیابان</label>
            <textarea id="street" name="street" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" rows="3"></textarea>
            <p class="text-red-500 text-xs mt-1">${formik.touched.street && formik.errors.street ? formik.errors.street : ''}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="unit" class="block text-sm font-medium text-gray-700">واحد</label>
              <input id="unit" name="unit" type="text" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" />
              <p class="text-red-500 text-xs mt-1">${formik.touched.unit && formik.errors.unit ? formik.errors.unit : ''}</p>
            </div>
            <div>
              <label for="plaque" class="block text-sm font-medium text-gray-700">پلاک</label>
              <input id="plaque" name="plaque" type="text" class="w-full p-2 border rounded-md focus:ring focus:ring-primary-300" />
              <p class="text-red-500 text-xs mt-1">${formik.touched.plaque && formik.errors.plaque ? formik.errors.plaque : ''}</p>
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'ثبت آدرس',
      cancelButtonText: 'لغو',
      customClass: {
        popup: 'bg-white rounded-lg shadow-lg max-w-lg w-full',
        title: 'font-bold text-lg',
        confirmButton: 'bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded',
      },
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      },
      didOpen: () => {
        const provinceSelect = document.getElementById('province') as HTMLSelectElement;
        provinceSelect.addEventListener('change', (e) => {
          const value = (e.target as HTMLSelectElement).value;
          setSelectedProvince(value);
          formik.setFieldValue('province', value);
          formik.setFieldValue('city', '');
        });

        const inputs = ['fullName', 'postalCode', 'city', 'street', 'unit', 'plaque'];
        inputs.forEach((id) => {
          const input = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
          input.addEventListener('input', (e) => {
            formik.setFieldValue(id, (e.target as HTMLInputElement).value);
            formik.setFieldTouched(id, true);
          });
        });
      },
      preConfirm: async () => {
        const form = document.getElementById('address-form') as HTMLFormElement;
        formik.setFieldValue('fullName', (form.querySelector('#fullName') as HTMLInputElement).value);
        formik.setFieldValue('postalCode', (form.querySelector('#postalCode') as HTMLInputElement).value);
        formik.setFieldValue('province', (form.querySelector('#province') as HTMLSelectElement).value);
        formik.setFieldValue('city', (form.querySelector('#city') as HTMLSelectElement).value);
        formik.setFieldValue('street', (form.querySelector('#street') as HTMLTextAreaElement).value);
        formik.setFieldValue('unit', (form.querySelector('#unit') as HTMLInputElement).value);
        formik.setFieldValue('plaque', (form.querySelector('#plaque') as HTMLInputElement).value);

        await formik.validateForm();
        if (!formik.isValid) {
          Swal.showValidationMessage('لطفاً خطاهای فرم را برطرف کنید');
          return false;
        }
        formik.handleSubmit();
        return true;
      },
    });
  };

  return (
    <button
      onClick={showForm}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
    >
      <MdOutlineAddLocationAlt className="h-6 w-6" />
      <span>آدرس جدید</span>
    </button>
  );
};

export default AddressFormModal;
