'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import TextInput from '@/components/ui/TextInput';

interface FullNameFormType {
  fullName: string;
}

interface AddressProps {
  onSubmit: (values: FullNameFormType) => Promise<void>;
  initialValues?: FullNameFormType;
  className?: string;
}

const FullNameForm = forwardRef<HTMLFormElement, AddressProps>(
  (
    {
      onSubmit,
      initialValues = {
        fullName: '',
      },
      className = '',
    },
    ref,
  ) => {
    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        fullName: Yup.string().trim().required('نام و نام خانوادگی الزامی است'),
      }),
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });

    return (
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-1 p-4 text-right ${className}`.trim()} dir="rtl">
        <TextInput id="fullName" name="fullName" label="نام و نام خانوادگی" formik={formik} />
      </form>
    );
  },
);

export default FullNameForm;
