'use client';

import TextInput from '@/components/ui/TextInput';
import { createContact } from '@/service/contactService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { shopInfo } from '@/data/shopInfo';
import Link from 'next/link';

const validationSchema = Yup.object({
  fullName: Yup.string().required('نام الزامی است'),
  phone: Yup.string().matches(/^\d+$/, 'شماره تماس باید فقط شامل اعداد باشد').required('شماره تماس الزامی است'),
  email: Yup.string().email('ایمیل نامعتبر است').optional(),
  message: Yup.string().required('پیام الزامی است'),
});

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createContact(values);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'پیام شما با موفقیت ارسال شد!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        resetForm();
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'خطایی در ارسال پیام رخ داد!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    },
  });

  return (
    <div className="container rounded-2xl bg-muted/70 shadow-lg border border-border/60 p-8 transition-all duration-200">
      <div className="mb-5 flex">
        <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary drop-shadow-lg">
          تماس با ما
          <span className="absolute -bottom-2 left-0 h-1 w-3/5 rounded-full bg-primary transition-all duration-500 animate-pulse"></span>
        </h1>
      </div>
      <p className="mb-5 leading-loose text-gray-700">
        قبل از مطرح کردن هرگونه سوال، بخش{' '}
        <Link href="/faq" className="text-primary hover:underline">
          سوالات متداول
        </Link>{' '}
        را مطالعه نمایید.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="col-span-1 md:col-span-3">
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput id="fullName" name="fullName" label="نام شما" isRequired formik={formik} />
            <TextInput id="phone" name="phone" label="شماره تماس شما" isRequired formik={formik} />
            <div className="col-span-1 md:col-span-2">
              <TextInput id="email" name="email" label="ایمیل شما" formik={formik} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <TextInput id="message" name="message" label="پیام شما" isRequired formik={formik} type="textarea" rows={3} />
            </div>
            <div className="col-span-1 flex justify-end md:col-span-2">
              <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2 text-white md:w-auto">
                ارسال پیام
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-2">
          <ul className="space-y-6">
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="text-gray-700">آدرس ایمیل</p>
                <a href={`mailto:${shopInfo.email}`} className="text-primary hover:underline">
                  {shopInfo.email}
                </a>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="text-gray-700">تلفن پشتیبانی</p>
                <a dir="ltr" href={`tel:${shopInfo.phone}`} className="text-primary hover:underline">
                  {shopInfo.phone}
                </a>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="min-w-fit text-gray-700">آدرس دفتر مرکزی</p>
                <a href="#" className="text-primary hover:underline">
                  {shopInfo.address}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
