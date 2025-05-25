'use client';

import { productVariant } from '@/Modules/product/types/productType';
import { attribute } from '@/shared/types/attributeType';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { transformVariants } from './VariantSelector';

interface VariantContextType {
  selectedVariant: productVariant | undefined;
  selectedColor: string;
  selectedButton: string;
  setSelectedColor: (id: string) => void;
  setSelectedButton: (slug: string) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const useVariant = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariant must be used within a VariantProvider');
  }
  return context;
};

interface VariantProviderProps {
  children: React.ReactNode;
  variants: productVariant[];
  attributes: attribute[];
}

export function VariantProvider({ children, variants, attributes }: VariantProviderProps) {
  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  const [selectedColor, setSelectedColor] = useState<string>(transformedVariants.colors.length > 0 ? transformedVariants.colors[0].id : '');
  const [selectedButton, setSelectedButton] = useState<string>(
    transformedVariants.buttons.length > 0 ? transformedVariants.buttons[0].slug : '',
  );

  const validButtons = useMemo(() => {
    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor),
    );
    const validButtonSlugs = validVariants
      .map((variant) => variant.attributeValues.find((attr) => attr.attributeId === 6)?.slug)
      .filter((slug): slug is string => !!slug);

    return transformedVariants.buttons.filter((button) => validButtonSlugs.includes(button.slug));
  }, [selectedColor, variants, transformedVariants.buttons]);

  const selectedVariant = useMemo(() => {
    return variants.find(
      (variant) =>
        variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor) &&
        variant.attributeValues.some((attr) => attr.attributeId === 6 && attr.slug === selectedButton),
    );
  }, [selectedColor, selectedButton, variants]);

  const handleColorChange = (id: string) => {
    setSelectedColor(id);
    const validVariants = variants.filter((variant) => variant.attributeValues.some((attr) => attr.id.toString() === id));
    const firstValidButton = validVariants[0]?.attributeValues.find((attr) => attr.attributeId === 6)?.slug;
    if (firstValidButton) {
      setSelectedButton(firstValidButton);
    }
  };

  const handleButtonChange = (slug: string) => {
    setSelectedButton(slug);
  };

  return (
    <VariantContext.Provider
      value={{ selectedVariant, selectedColor, selectedButton, setSelectedColor: handleColorChange, setSelectedButton: handleButtonChange }}
    >
      {children}
    </VariantContext.Provider>
  );
}
