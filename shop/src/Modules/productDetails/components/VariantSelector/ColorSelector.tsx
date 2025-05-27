'use client';

import React from 'react';
import { IColor } from '@/lib/types/colors';

interface Props {
  colors: IColor[];
  selectedColor: string | null;
  onColorChange: (id: string | null) => void;
  label?: string;
}

export default function ColorSelector({ colors, selectedColor, onColorChange, label }: Props) {
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      {label && <div className="mb-4 text-text">{label}</div>}
      <fieldset className="flex flex-wrap items-center gap-1">
        <legend className="sr-only">Color</legend>
        {colors.map((color) => (
          <div key={color.id}>
            <input
              type="radio"
              name="color-desktop"
              value={color.id}
              id={color.id}
              checked={selectedColor === color.id}
              onChange={() => {
                if (!color.isDisabled) {
                  const newValue = selectedColor === color.id ? null : color.id;
                  console.log('Color input changed:', newValue);
                  onColorChange(newValue);
                }
              }}
              disabled={color.isDisabled} // غیرفعال کردن ورودی
              className="peer hidden"
            />
            <label
              htmlFor={color.id}
              className={`relative block cursor-pointer rounded-full border-2 p-2 shadow-base transition-border duration-150 ease-in-out ${
                color.isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'peer-checked:border-3 peer-checked:border-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]'
              }`}
              style={{
                borderColor: selectedColor === color.id && !color.isDisabled ? 'hsl(var(--primary))' : 'hsl(var(--border) / 0.3)',
              }}
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="h-6 w-6 rounded-full border-2"
                  style={{ backgroundColor: color.color, borderColor: 'hsl(var(--border) / 0.3)' }}
                ></div>
                <p className="text-text/90">{color.name}</p>
              </div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
