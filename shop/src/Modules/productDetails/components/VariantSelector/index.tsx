'use client';

import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedButton, setSelectedColor, setSelectedVariant } from '@/store/slices/productSlice';
import { Attribute } from '@/shared/types/attributeType';
import { ProductVariant } from '@/Modules/product/types/productType';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';

import { findMatchingVariant, getDefaultSelections, transformVariants } from '../utils/productVariants';
interface Props {
  variants: ProductVariant[];
  attributes: Attribute[];
  productType: 'VARIABLE' | 'SIMPLE';
  defaultVariantId?: number;
}

export default function ProductVariants({ variants, attributes, productType, defaultVariantId }: Props) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (productType === 'VARIABLE' && defaultVariantId && !selectedVariant) {
      const { defaultColor, defaultButton, defaultVariant } = getDefaultSelections(variants, attributes, defaultVariantId);
      if (defaultVariant) {
        dispatch(setSelectedVariant(defaultVariant));
        if (defaultColor) dispatch(setSelectedColor(defaultColor));
        if (defaultButton) dispatch(setSelectedButton(defaultButton));
      }
    }
  }, [defaultVariantId, productType, variants, attributes, dispatch, selectedVariant]);

  useEffect(() => {
    if (productType === 'VARIABLE') {
      const matchingVariant = findMatchingVariant(variants, selectedColor, selectedButton, attributes);
      if (matchingVariant !== selectedVariant) {
        dispatch(setSelectedVariant(matchingVariant));
      }
    } else {
      dispatch(setSelectedVariant(null));
    }
  }, [selectedColor, selectedButton, variants, attributes, productType, dispatch, selectedVariant]);

  const validButtons = useMemo(() => {
    const buttonAttrId = attributes.find((attr) => attr.type === 'BUTTON')?.id;
    if (!buttonAttrId || !selectedColor) {
      return transformVariants(variants, attributes).buttons.map((button) => ({ ...button, isDisabled: true }));
    }

    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some(
        (attr) => attr.attributeId === attributes.find((a) => a.type === 'COLOR')?.id && attr.id.toString() === selectedColor,
      ),
    );

    const validButtonSlugs = new Set(
      validVariants.flatMap((variant) =>
        variant.attributeValues.filter((attr) => attr.attributeId === buttonAttrId).map((attr) => attr.slug),
      ),
    );

    return transformVariants(variants, attributes).buttons.map((button) => ({
      ...button,
      isDisabled: !validButtonSlugs.has(button.slug),
    }));
  }, [selectedColor, variants, attributes]);

  const validColors = useMemo(() => {
    const colorAttrId = attributes.find((attr) => attr.type === 'COLOR')?.id;
    if (!colorAttrId) return transformVariants(variants, attributes).colors;

    if (selectedButton) {
      const validVariants = variants.filter((variant) =>
        variant.attributeValues.some(
          (attr) => attr.attributeId === attributes.find((a) => a.type === 'BUTTON')?.id && attr.slug === selectedButton,
        ),
      );

      const validColorIds = new Set(
        validVariants.flatMap((variant) =>
          variant.attributeValues.filter((attr) => attr.attributeId === colorAttrId).map((attr) => attr.id.toString()),
        ),
      );

      return transformVariants(variants, attributes).colors.map((color) => ({
        ...color,
        isDisabled: !validColorIds.has(color.id),
      }));
    }

    return transformVariants(variants, attributes).colors;
  }, [selectedButton, variants, attributes]);

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  if (productType === 'SIMPLE') {
    return (
      <div className="mb-4">
        <p>مشخصات محصول:</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {validColors.length > 0 && (
        <div className="mb-3 space-y-6">
          <ColorSelector
            label={colorLabel}
            colors={validColors}
            selectedColor={selectedColor}
            onColorChange={(color) => {
              dispatch(setSelectedColor(color));
              const matchingVariant = findMatchingVariant(variants, color, selectedButton, attributes);
              dispatch(setSelectedVariant(matchingVariant));
            }}
          />
        </div>
      )}

      {validButtons.length > 0 && (
        <div className="mb-3 space-y-6">
          <ButtonSelector
            title={buttonLabel}
            options={validButtons}
            selectedOption={selectedButton}
            onOptionChange={(button) => {
              dispatch(setSelectedButton(button));
              const matchingVariant = findMatchingVariant(variants, selectedColor, button, attributes);
              dispatch(setSelectedVariant(matchingVariant));
            }}
          />
        </div>
      )}
    </div>
  );
}
