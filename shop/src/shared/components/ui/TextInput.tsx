'use client';

import React from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'textarea';
  formik: any;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
  isRequired?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  type = 'text',
  formik,
  rows = 3,
  disabled = false,
  placeholder,
  isRequired = false,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  const commonProps = {
    id,
    name,
    dir: 'auto' as const,
    placeholder: placeholder || label,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    disabled,
    className: `block w-full rounded-lg border p-3 pr-4 text-sm text-right bg-white focus:outline-none transition
      ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'}
      disabled:opacity-50`,
  };

  return (
    <div className="mb-4 text-right">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>

      {type === 'textarea' ? <textarea {...commonProps} rows={rows} /> : <input {...commonProps} type={type} />}

      {hasError && <p className="text-xs text-red-500 mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

export default TextInput;
