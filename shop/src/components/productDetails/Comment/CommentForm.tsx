'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import TextInput from '@/components/ui/TextInput';
import SuggestionRadio from './AddReplyComment/SuggestionRadio';

export interface CommentFormikType {
  title: string;
  content: string;
  isRecommended?: boolean;
}

interface CommentProps {
  onSubmit: (values: CommentFormikType) => Promise<void>;
  initialValues?: CommentFormikType;
  className?: string;
}

const CommentForm = forwardRef<HTMLFormElement, CommentProps>(
  (
    {
      onSubmit,
      initialValues = {
        title: '',
        content: '',
        isRecommended: true,
      },
      className = '',
    },
    ref,
  ) => {
    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        title: Yup.string().trim().required('عنوان الزامی است'),
        content: Yup.string().trim().required('متن دیدگاه الزامی است'),
        isRecommended: Yup.boolean().optional(),
      }),
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });

    return (
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-4 p-4 text-right ${className}`.trim()} dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          <TextInput id="title" name="title" isRequired label="عنوان دیدگاه" formik={formik} className="col-span-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="mb-4 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
            <SuggestionRadio
              name="isRecommended"
              selected={formik.values.isRecommended}
              onChange={(value) => formik.setFieldValue('isRecommended', value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="content" className="relative block rounded-lg border shadow-base">
              <textarea
                id="content"
                name="content"
                rows={3}
                className="main-scroll peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                placeholder="متن دیدگاه"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                متن دیدگاه
              </span>
            </label>
            {formik.touched.content && formik.errors.content && <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>}
          </div>
        </div>
      </form>
    );
  },
);

export default CommentForm;
