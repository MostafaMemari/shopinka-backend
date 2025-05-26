'use client';

import React from 'react';

interface ButtonOption {
  slug: string;
  label: string;
}

interface Props {
  options: ButtonOption[];
  selectedOption: string | null;
  onOptionChange: (value: string | null) => void;
  title?: string;
}

export default function ButtonSelector({ options, selectedOption, onOptionChange, title }: Props) {
  if (!options || options.length === 0) return null;

  return (
    <div>
      {title && <div className="mb-4 text-text">{title}</div>}
      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="sr-only">Options</legend>
        {options.map((option) => (
          <div key={option.slug}>
            <input
              type="radio"
              name="option-selector"
              value={option.slug}
              id={option.slug}
              checked={selectedOption === option.slug}
              onChange={() => {
                const newValue = selectedOption === option.slug ? null : option.slug;
                console.log('Button input changed:', newValue);
                onOptionChange(newValue);
              }}
              className="peer hidden"
            />
            <label
              htmlFor={option.slug}
              className="relative flex h-12 w-auto min-w-[48px] cursor-pointer items-center justify-center rounded-full border-2 px-3 py-1 shadow-base transition-border duration-150 ease-in-out peer-checked:border-3 peer-checked:border-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]"
            >
              <p className="text-sm font-bold text-text/90 md:text-base">{option.label}</p>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
