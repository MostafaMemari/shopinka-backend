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
  if (!colors?.length) return null;

  const handleColorChange = (colorId: string): void => {
    const newValue = selectedColor === colorId ? null : colorId;
    onColorChange(newValue);
  };

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
              onChange={() => handleColorChange(color.id)}
              disabled={color.isDisabled}
              className="peer hidden"
              aria-label={color.name}
            />
            <label
              htmlFor={color.id}
              className={`block cursor-pointer rounded-full border-2 p-2 shadow-base transition-border duration-150 ease-in-out ${
                color.isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : selectedColor === color.id
                    ? 'border-[hsl(var(--primary))]'
                    : 'border-[hsl(var(--border))]'
              }`}
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="h-6 w-6 rounded-full border-2"
                  style={{ backgroundColor: color.color, borderColor: 'hsl(var(--border) / 0.3)' }}
                />
                <p className="text-text/90">{color.name}</p>
              </div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
