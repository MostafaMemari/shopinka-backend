'use client';

import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedButton, setSelectedColor, setSelectedVariant } from '@/store/slices/productSlice';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { getDefaultSelections, transformVariants } from '../utils/productVariants';

import { ProductVariant } from '@/Modules/product/types/productType';
import { findMatchingVariant } from '../utils/productVariants';
import { Attribute, AttributeValues } from '@/shared/types/attributeType';
interface Props {
  variants: ProductVariant[];
  attributes: Attribute[];
  productType: 'VARIABLE' | 'SIMPLE';
  defaultVariantId?: number;
}

export default function ProductVariants({ variants, attributes, productType, defaultVariantId }: Props) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.product);

  // تنظیم واریانت پیش‌فرض
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

  // آپدیت واریانت بر اساس انتخاب‌های کاربر
  useEffect(() => {
    if (productType === 'VARIABLE') {
      const matchingVariant = findMatchingVariant(variants, selectedColor, selectedButton, attributes);
      if (matchingVariant && matchingVariant.id !== selectedVariant?.id) {
        dispatch(setSelectedVariant(matchingVariant));
      }
    } else {
      dispatch(setSelectedVariant(null));
    }
  }, [selectedColor, selectedButton, variants, attributes, productType, dispatch]);

  const validButtons = useMemo(() => {
    const buttonAttrId = attributes.find((attr) => attr.type === 'BUTTON')?.id;
    const transformedButtons = transformVariants(variants, attributes).buttons;

    if (!buttonAttrId || !selectedColor) {
      return transformedButtons.map((button) => ({ ...button, isDisabled: true }));
    }

    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some(
        (attr) => attr.attributeId === attributes.find((a) => a.type === 'COLOR')?.id && attr.id.toString() === selectedColor,
      ),
    );

    const validButtonSlugs = new Set(
      validVariants.flatMap((variant) =>
        variant.attributeValues.filter((attr: AttributeValues) => attr.attributeId === buttonAttrId).map((attr) => attr.slug),
      ),
    );

    return transformedButtons.map((button) => ({
      ...button,
      isDisabled: !validButtonSlugs.has(button.slug),
    }));
  }, [selectedColor, variants, attributes]);

  const validColors = useMemo(() => {
    return transformVariants(variants, attributes).colors.map((color) => ({
      ...color,
      isDisabled: false,
    }));
  }, [variants, attributes]);

  // انتخاب خودکار اولین دکمه نوع فقط وقتی selectedButton null است
  useEffect(() => {
    if (selectedColor && validButtons.length > 0 && selectedButton === null) {
      const firstEnabledButton = validButtons.find((button) => !button.isDisabled);
      if (firstEnabledButton) {
        dispatch(setSelectedButton(firstEnabledButton.slug));
      }
    } else if (selectedColor && validButtons.every((button) => button.isDisabled)) {
      dispatch(setSelectedButton(null));
    }
  }, [selectedColor, validButtons, selectedButton, dispatch]);

  // ریست کردن انتخاب‌ها
  const handleReset = () => {
    dispatch(setSelectedColor(null));
    dispatch(setSelectedButton(null));
    dispatch(setSelectedVariant(null));
  };

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  if (productType === 'SIMPLE') {
    return (
      <div className="mb-4">
        <p className="text-gray-700">مشخصات محصول:</p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">انتخاب مشخصات</h3>
        {(selectedColor || selectedButton) && (
          <button onClick={handleReset} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            پاک کردن انتخاب‌ها
          </button>
        )}
      </div>

      {validColors.length > 0 && (
        <div className="mb-4">
          <ColorSelector
            label={colorLabel}
            colors={validColors}
            selectedColor={selectedColor}
            onColorChange={(color) => {
              dispatch(setSelectedColor(color));
            }}
          />
          {selectedColor && validButtons.every((button) => button.isDisabled) && (
            <p className="text-sm text-gray-500 mt-2">این رنگ نوع برچسب ندارد.</p>
          )}
        </div>
      )}

      {validButtons.length > 0 && (
        <div className="mb-4">
          <ButtonSelector
            title={buttonLabel}
            options={validButtons}
            selectedOption={selectedButton}
            onOptionChange={(button) => {
              dispatch(setSelectedButton(button));
            }}
          />
        </div>
      )}
    </div>
  );
}
