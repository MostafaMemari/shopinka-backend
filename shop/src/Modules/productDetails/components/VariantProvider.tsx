'use client';

import { productVariant } from '@/Modules/product/types/productType';
import { attribute } from '@/shared/types/attributeType';
import React, { createContext, useContext, useMemo } from 'react';
import { transformVariants } from './VariantSelector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setSelectedColor,
  setSelectedButton,
  setSelectedVariant,
  setVariants,
  setAttributes,
  setSelectedImage,
} from '@/store/slices/variantSlice';

interface VariantContextType {
  selectedVariant: productVariant | undefined;
  selectedColor: string | null;
  selectedButton: string | null;
  setSelectedColor: (id: string | null) => void;
  setSelectedButton: (slug: string | null) => void;
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
  const dispatch = useDispatch();
  const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.variant);

  // Initialize variants and attributes in Redux
  React.useEffect(() => {
    dispatch(setVariants(variants));
    dispatch(setAttributes(attributes));
  }, [variants, attributes, dispatch]);

  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  // Set initial color
  React.useEffect(() => {
    if (!selectedColor && transformedVariants.colors.length > 0) {
      dispatch(setSelectedColor(transformedVariants.colors[0].id));
    }
  }, [selectedColor, transformedVariants.colors, dispatch]);

  // Set initial button
  React.useEffect(() => {
    if (!selectedButton && transformedVariants.buttons.length > 0) {
      const validVariants = variants.filter((variant) =>
        variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor),
      );
      const firstValidButton = validVariants[0]?.attributeValues.find((attr) => attr.attributeId === 6)?.slug || null;
      dispatch(setSelectedButton(firstValidButton));
    }
  }, [selectedButton, selectedColor, variants, transformedVariants.buttons, dispatch]);

  // Update selected variant and image
  React.useEffect(() => {
    if (!selectedColor && !selectedButton) {
      const firstVariant = variants[0];
      dispatch(setSelectedVariant(firstVariant));
      if (firstVariant?.mainImage?.fileUrl) {
        dispatch(setSelectedImage(firstVariant.mainImage.fileUrl));
      }
      return;
    }

    const variant = variants.find((variant) => {
      const hasColor = variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor);
      const hasButton = selectedButton
        ? variant.attributeValues.some((attr) => attr.attributeId === 6 && attr.slug === selectedButton)
        : true;
      return hasColor && hasButton;
    });

    const finalVariant =
      variant || variants.find((v) => v.attributeValues.some((attr) => attr.id.toString() === selectedColor)) || variants[0];

    dispatch(setSelectedVariant(finalVariant));
    if (finalVariant?.mainImage?.fileUrl) {
      dispatch(setSelectedImage(finalVariant.mainImage.fileUrl));
    }
  }, [selectedColor, selectedButton, variants, dispatch]);

  const handleColorChange = (id: string | null) => {
    dispatch(setSelectedColor(id));
    if (id) {
      const validVariants = variants.filter((variant) => variant.attributeValues.some((attr) => attr.id.toString() === id));
      const firstValidButton = validVariants[0]?.attributeValues.find((attr) => attr.attributeId === 6)?.slug || null;
      dispatch(setSelectedButton(firstValidButton));
    } else {
      dispatch(setSelectedButton(null));
      // Reset to first variant when color is deselected
      const firstVariant = variants[0];
      dispatch(setSelectedVariant(firstVariant));
      if (firstVariant?.mainImage?.fileUrl) {
        dispatch(setSelectedImage(firstVariant.mainImage.fileUrl));
      }
    }
  };

  const handleButtonChange = (slug: string | null) => {
    dispatch(setSelectedButton(slug));
    if (!slug) {
      // Reset to first variant when button is deselected
      const firstVariant = variants[0];
      dispatch(setSelectedVariant(firstVariant));
      if (firstVariant?.mainImage?.fileUrl) {
        dispatch(setSelectedImage(firstVariant.mainImage.fileUrl));
      }
    }
  };

  return (
    <VariantContext.Provider
      value={{ selectedVariant, selectedColor, selectedButton, setSelectedColor: handleColorChange, setSelectedButton: handleButtonChange }}
    >
      {children}
    </VariantContext.Provider>
  );
}
