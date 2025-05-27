'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColor } from '@/lib/types/colors';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { productVariant } from '@/Modules/product/types/productType';
import { attribute, attributeValues } from '@/shared/types/attributeType';
import { RootState } from '@/store';
import { setSelectedButton, setSelectedColor, setSelectedVariant } from '@/store/slices/productSlice';

interface TransformedVariants {
  colors: IColor[];
  buttons: { slug: string; label: string; isDisabled?: boolean }[];
}

interface Props {
  variants: productVariant[];
  attributes: attribute[];
  productType: string;
  defaultVariantId?: number;
}

// تابع برای تبدیل واریانت‌ها
export const transformVariants = (variants: productVariant[], attributes: attribute[]): TransformedVariants => {
  const colors: IColor[] = [];
  const buttons: { slug: string; label: string; isDisabled?: boolean }[] = [];

  const uniqueColors = new Map<string, IColor>();
  const uniqueButtons = new Map<string, { slug: string; label: string; isDisabled?: boolean }>();

  variants.forEach((variant) => {
    variant.attributeValues.forEach((attr: attributeValues) => {
      const colorAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'COLOR');
      if (colorAttr && attr.colorCode && !uniqueColors.has(attr.slug)) {
        uniqueColors.set(attr.slug, {
          id: attr.id.toString(),
          name: attr.name,
          color: attr.colorCode,
          isDisabled: false, // فعلاً همه رنگ‌ها فعالن
        });
      }

      const buttonAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'BUTTON');
      if (buttonAttr && !uniqueButtons.has(attr.slug)) {
        uniqueButtons.set(attr.slug, {
          slug: attr.slug,
          label: attr.buttonLabel || attr.name,
          isDisabled: false, // به‌صورت پیش‌فرض فعال، بعداً مدیریت می‌شه
        });
      }
    });
  });

  return {
    colors: Array.from(uniqueColors.values()),
    buttons: Array.from(uniqueButtons.values()),
  };
};

// تابع برای پیدا کردن واریانت بر اساس انتخاب‌ها
const findMatchingVariant = (
  variants: productVariant[],
  selectedColor: string | null,
  selectedButton: string | null,
): productVariant | null => {
  if (!selectedColor || !selectedButton) return null; // فقط وقتی هر دو انتخاب شده باشن واریانت پیدا می‌شه
  return (
    variants.find((variant) =>
      variant.attributeValues.every((attr) => {
        if (attr.attributeId === 1) {
          return attr.id.toString() === selectedColor;
        }
        if (attr.attributeId === 6) {
          return attr.slug === selectedButton;
        }
        return true;
      }),
    ) || null
  );
};

export default function ProductVariants({ variants, attributes, productType, defaultVariantId }: Props) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton } = useSelector((state: RootState) => state.product);

  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  // آپدیت واریانت بر اساس انتخاب‌ها
  useMemo(() => {
    if (productType === 'VARIABLE') {
      const matchingVariant = findMatchingVariant(variants, selectedColor, selectedButton);
      dispatch(setSelectedVariant(matchingVariant));
    } else {
      dispatch(setSelectedVariant(null));
    }
  }, [selectedColor, selectedButton, variants, productType, dispatch]);

  // دکمه‌های معتبر برای رنگ انتخاب‌شده
  const validButtons = useMemo(() => {
    const buttons = transformedVariants.buttons.map((button) => ({ ...button, isDisabled: !selectedColor }));
    if (!selectedColor) return buttons; // اگه رنگی انتخاب نشده، همه دکمه‌ها غیرفعالن

    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor),
    );
    const validButtonSlugs = validVariants
      .map((variant) => variant.attributeValues.find((attr) => attr.attributeId === 6)?.slug)
      .filter((slug): slug is string => !!slug);

    return buttons.map((button) => ({
      ...button,
      isDisabled: !validButtonSlugs.includes(button.slug), // غیرفعال کردن دکمه‌های نامرتبط
    }));
  }, [selectedColor, variants, transformedVariants.buttons]);

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  if (productType === 'SIMPLE') {
    return (
      <div className="mb-4">
        <p>مشخصات محصول:</p>
        {/* مشخصات اصلی محصول */}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {transformedVariants.colors.length > 0 && (
        <div className="mb-3 space-y-6">
          <ColorSelector
            label={colorLabel}
            colors={transformedVariants.colors}
            selectedColor={selectedColor}
            onColorChange={(color) => {
              dispatch(setSelectedColor(color));
              if (!color) dispatch(setSelectedButton(null)); // پاک کردن نوع برچسب وقتی رنگ پاک می‌شه
            }}
          />
        </div>
      )}

      {transformedVariants.buttons.length > 0 && (
        <div className="mb-3 space-y-6">
          <ButtonSelector
            title={buttonLabel}
            options={validButtons}
            selectedOption={selectedButton}
            onOptionChange={(button) => dispatch(setSelectedButton(button))}
          />
        </div>
      )}
    </div>
  );
}
