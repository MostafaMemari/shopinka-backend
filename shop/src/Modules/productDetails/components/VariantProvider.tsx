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
  defaultImage?: string | null;
}

export function VariantProvider({ children, variants, attributes, defaultImage }: VariantProviderProps) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.variant);
  const isVariableProduct = variants.length > 0;

  // Initialize variants and attributes in Redux
  React.useEffect(() => {
    dispatch(setVariants(variants));
    dispatch(setAttributes(attributes));

    // Set default image for simple products
    if (!isVariableProduct && defaultImage) {
      dispatch(setSelectedImage(defaultImage));
    }
  }, [variants, attributes, dispatch, isVariableProduct, defaultImage]);

  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  // Handle variant selection and image updates
  const updateVariantAndImage = React.useCallback(
    (variant: productVariant | undefined) => {
      dispatch(setSelectedVariant(variant));
      if (variant?.mainImage?.fileUrl) {
        dispatch(setSelectedImage(variant.mainImage.fileUrl));
      } else if (!isVariableProduct && defaultImage) {
        dispatch(setSelectedImage(defaultImage));
      } else {
        dispatch(setSelectedImage(null));
      }
    },
    [dispatch, isVariableProduct, defaultImage],
  );

  // Update selected variant and image when selections change
  React.useEffect(() => {
    if (!isVariableProduct) {
      updateVariantAndImage(undefined);
      return;
    }

    if (!selectedColor && !selectedButton) {
      updateVariantAndImage(undefined);
      return;
    }

    const variant = variants.find((variant) => {
      const hasColor = selectedColor
        ? variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor)
        : true;
      const hasButton = selectedButton
        ? variant.attributeValues.some((attr) => attr.attributeId === 6 && attr.slug === selectedButton)
        : true;
      return hasColor && hasButton;
    });

    updateVariantAndImage(variant);
  }, [selectedColor, selectedButton, variants, updateVariantAndImage, isVariableProduct]);

  const handleColorChange = (id: string | null) => {
    if (selectedColor === id) {
      dispatch(setSelectedColor(null));
      updateVariantAndImage(undefined);
    } else {
      dispatch(setSelectedColor(id));
    }
  };

  const handleButtonChange = (slug: string | null) => {
    if (selectedButton === slug) {
      dispatch(setSelectedButton(null));
      updateVariantAndImage(undefined);
    } else {
      dispatch(setSelectedButton(slug));
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
