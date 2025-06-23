'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef, useEffect, useRef } from 'react';
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

    // Ref برای فیلد title
    const titleInputRef = useRef<HTMLInputElement>(null);

    // فوکوس خودکار روی فیلد title موقع لود
    useEffect(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, []);

    return (
      <form ref={ref} onSubmit={formik.handleSubmit} className={`space-y-4 p-4 text-right ${className}`.trim()} dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="title"
            name="title"
            isRequired
            label="عنوان دیدگاه"
            formik={formik}
            className="col-span-2 mb-1"
            inputRef={titleInputRef}
          />
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
            <TextInput
              id="content"
              name="content"
              type="textarea"
              label="متن دیدگاه"
              isRequired
              rows={3}
              formik={formik}
              className="col-span-2 mb-1"
            />
          </div>
        </div>
      </form>
    );
  },
);

CommentForm.displayName = 'CommentForm';

export default CommentForm;
