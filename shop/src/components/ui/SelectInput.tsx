import React from 'react';
import Select from 'react-select';

export interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  formik: any;
  options: Option[];
  placeholder: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (selectedOption: Option | null) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  formik,
  options,
  placeholder,
  isDisabled = false,
  isRequired = false,
  onChange,
}) => {
  const selectedOption = options.find((opt) => opt.value === formik.values[name]);

  const defaultHandleChange = (selected: Option | null) => {
    const value = selected?.value || '';
    formik.setFieldValue(name, value, true);
    formik.validateField(name).then(() => {
      if (value) {
        formik.setFieldTouched(name, false, false);
      }
      if (onChange) onChange(selected);
    });
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>
      <Select
        inputId={id}
        name={name}
        value={selectedOption || null}
        onChange={defaultHandleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
        options={options}
        placeholder={placeholder}
        isClearable
        isDisabled={isDisabled}
        isSearchable
        styles={{
          control: (base, state) => ({
            ...base,
            direction: 'rtl',
            borderRadius: '0.5rem',
            minHeight: '40px',
            borderColor: state.isFocused ? '#a00' : '#D1D5DB',
            boxShadow: state.isFocused ? '0 0 0 1px #a00' : undefined,
            '&:hover': {
              borderColor: '#a00',
            },
          }),
          input: (base) => ({ ...base, direction: 'rtl' }),
          placeholder: (base) => ({ ...base, textAlign: 'right' }),
          singleValue: (base) => ({ ...base, textAlign: 'right', direction: 'rtl' }),
        }}
      />
      {formik.touched[name] && formik.errors[name] && <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

export default SelectInput;
