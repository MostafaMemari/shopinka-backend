'use client';

import React from 'react';
import Select from 'react-select';
import { Option } from '@/modules/checkout/components/AddressFormDrawer';

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  formik: any;
  options: Option[];
  placeholder: string;
  isDisabled?: boolean;
  onChange?: (selectedOption: Option | null) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, name, label, formik, options, placeholder, isDisabled = false, onChange }) => {
  const selectedOption = options.find((opt) => opt.value === formik.values[name]);

  const defaultHandleChange = (selected: Option | null) => {
    formik.setFieldValue(name, selected?.value || '');
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select
        inputId={id}
        name={name}
        value={selectedOption || null}
        onChange={onChange || defaultHandleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
        options={options}
        placeholder={placeholder}
        isClearable
        isDisabled={isDisabled}
        classNames={{
          control: (state) => `border rounded-lg text-sm min-h-[40px]  ${state.isFocused ? 'border-primary shadow' : 'border-gray-300'}`,
          option: (state) => `text-right py-2 px-3 cursor-pointer ${state.isSelected ? 'bg-primary text-white' : ''}`,
          menu: () => 'z-50 text-sm',
        }}
        styles={{
          input: (base) => ({ ...base, direction: 'rtl' }),
          placeholder: (base) => ({ ...base, textAlign: 'right' }),
          singleValue: (base) => ({ ...base, textAlign: 'right', direction: 'rtl' }),
        }}
        isSearchable
      />
      {formik.touched[name] && formik.errors[name] && <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

export default SelectInput;
