'use client';

import React from 'react';

interface ButtonOption {
  slug: string;
  label: string;
  isDisabled?: boolean;
}

interface Props {
  options: ButtonOption[];
  selectedOption: string | null;
  onOptionChange: (value: string | null) => void;
  title?: string;
}

export default function ButtonSelector({ options, selectedOption, onOptionChange, title }: Props) {
  if (!options?.length) return null;

  const handleOptionChange = (slug: string): void => {
    const newValue = selectedOption === slug ? null : slug;
    onOptionChange(newValue);
  };

  return (
    <>
      <div>
        {title && <div className="mb-4 text-text">{title}</div>}
        <fieldset className="flex flex-wrap items-center gap-1">
          <legend className="sr-only">Options</legend>
          {options.map((option) => (
            <div key={option.slug}>
              <input
                type="radio"
                name="option-selector"
                value={option.slug}
                id={option.slug}
                checked={selectedOption === option.slug}
                onChange={() => handleOptionChange(option.slug)}
                disabled={option.isDisabled}
                className="peer hidden"
                aria-label={option.label}
              />
              <label
                htmlFor={option.slug}
                className={`block cursor-pointer rounded-full border-2 p-2 shadow-base transition-border duration-150 ease-in-out ${
                  option.isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : selectedOption === option.slug
                      ? 'border-[hsl(var(--primary))]'
                      : 'border-[hsl(var(--border))]'
                }`}
              >
                <p className="text-text/90">{option.label}</p>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
}

{
  /* <>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label
          key={option.slug}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
            selectedOption === option.slug ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${option.isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            type="radio"
            name={title}
            value={option.slug}
            checked={selectedOption === option.slug}
            onChange={() => !option.isDisabled && onOptionChange(option.slug)}
            disabled={option.isDisabled}
            className="form-radio text-blue-600"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  </div>
</>; */
}
