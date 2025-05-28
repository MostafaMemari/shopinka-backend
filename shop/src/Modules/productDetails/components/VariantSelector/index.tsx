'use client';

import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColor } from '@/lib/types/colors';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { productVariant } from '@/Modules/product/types/productType';
import { RootState } from '@/store';
import { setSelectedButton, setSelectedColor, setSelectedVariant } from '@/store/slices/productSlice';
import { Attribute, AttributeValues } from '@/shared/types/attributeType';

interface TransformedVariants {
  colors: IColor[];
  buttons: { slug: string; label: string; isDisabled?: boolean }[];
}

interface Props {
  variants: productVariant[];
  attributes: Attribute[];
  productType: string;
  defaultVariantId?: number;
}

// Function to transform variants
export const transformVariants = (variants: productVariant[], attributes: Attribute[]): TransformedVariants => {
  const colors: IColor[] = [];
  const buttons: { slug: string; label: string; isDisabled?: boolean }[] = [];
  const uniqueColors = new Map<string, IColor>();
  const uniqueButtons = new Map<string, { slug: string; label: string; isDisabled?: boolean }>();

  variants.forEach((variant) => {
    variant.attributeValues.forEach((attr: AttributeValues) => {
      const colorAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'COLOR');
      if (colorAttr && attr.colorCode && !uniqueColors.has(attr.slug)) {
        uniqueColors.set(attr.slug, {
          id: attr.id.toString(),
          name: attr.name,
          color: attr.colorCode,
          isDisabled: false,
        });
      }

      const buttonAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'BUTTON');
      if (buttonAttr && !uniqueButtons.has(attr.slug)) {
        uniqueButtons.set(attr.slug, {
          slug: attr.slug,
          label: attr.buttonLabel || attr.name,
          isDisabled: false,
        });
      }
    });
  });

  return {
    colors: Array.from(uniqueColors.values()),
    buttons: Array.from(uniqueButtons.values()),
  };
};

// Function to find a variant based on selections
const findMatchingVariant = (
  variants: productVariant[],
  selectedColor: string | null,
  selectedButton: string | null,
): productVariant | null => {
  return (
    variants.find((variant) => {
      // Handle variants with only one attribute value
      if (variant.attributeValues.length === 1) {
        const singleAttr = variant.attributeValues[0];
        if (singleAttr.attributeId === 1 && singleAttr.id.toString() === selectedColor) {
          return true;
        }
        if (singleAttr.attributeId === 6 && singleAttr.slug === selectedButton) {
          return true;
        }
        return false;
      }

      // Handle variants with multiple attribute values
      const hasColor = variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor);
      const hasButton = variant.attributeValues.some((attr) => attr.attributeId === 6 && attr.slug === selectedButton);

      return hasColor && hasButton;
    }) || null
  );
};

export default function ProductVariants({ variants, attributes, productType, defaultVariantId }: Props) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton } = useSelector((state: RootState) => state.product);

  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  // Effect to handle initial selection or changes
  useEffect(() => {
    if (productType === 'VARIABLE') {
      const matchingVariant = findMatchingVariant(variants, selectedColor, selectedButton);
      dispatch(setSelectedVariant(matchingVariant));

      // Special case: if a single-attribute variant is selected, update both color and button
      if (matchingVariant && matchingVariant.attributeValues.length === 1) {
        const singleAttr = matchingVariant.attributeValues[0];
        if (singleAttr.attributeId === 1 && singleAttr.id.toString() !== selectedColor) {
          dispatch(setSelectedColor(singleAttr.id.toString()));
          dispatch(setSelectedButton(null));
        } else if (singleAttr.attributeId === 6 && singleAttr.slug !== selectedButton) {
          dispatch(setSelectedButton(singleAttr.slug));
          dispatch(setSelectedColor(null));
        }
      }
    } else {
      dispatch(setSelectedVariant(null));
    }
  }, [selectedColor, selectedButton, variants, productType, dispatch]);

  // Valid buttons for the selected color
  const validButtons = useMemo(() => {
    const singleAttributeVariant = variants.find(
      (v) => v.attributeValues.length === 1 && v.attributeValues[0].id.toString() === selectedColor,
    );

    if (singleAttributeVariant) {
      return transformedVariants.buttons.map((button) => ({ ...button, isDisabled: true }));
    }

    if (!selectedColor) {
      return transformedVariants.buttons.map((button) => ({ ...button, isDisabled: true }));
    }

    const validVariantsForColor = variants.filter((variant) =>
      variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor),
    );

    const validButtonSlugs = new Set(
      validVariantsForColor.flatMap((variant) => variant.attributeValues.filter((attr) => attr.attributeId === 6)).map((attr) => attr.slug),
    );

    return transformedVariants.buttons.map((button) => ({
      ...button,
      isDisabled: !validButtonSlugs.has(button.slug),
    }));
  }, [selectedColor, variants, transformedVariants.buttons]);

  // Valid colors considering button selection
  const validColors = useMemo(() => {
    if (selectedButton) {
      const combinableColorIds = new Set(
        variants
          .filter((variant) => variant.attributeValues.some((attr) => attr.attributeId === 6 && attr.slug === selectedButton))
          .flatMap((variant) => variant.attributeValues.filter((attr) => attr.attributeId === 1).map((attr) => attr.id.toString())),
      );

      const singleAttributeColorVariants = variants.filter((v) => v.attributeValues.length === 1 && v.attributeValues[0].attributeId === 1);

      return transformedVariants.colors.map((color) => {
        const isSingleAttrColor = singleAttributeColorVariants.some((v) => v.attributeValues[0].id.toString() === color.id);
        return {
          ...color,
          isDisabled: !isSingleAttrColor && !combinableColorIds.has(color.id),
        };
      });
    }

    const singleAttributeColorVariants = variants
      .filter((v) => v.attributeValues.length === 1 && v.attributeValues[0].attributeId === 1)
      .map((v) => v.attributeValues[0].id.toString());

    const colorsWithButtons = new Set(
      variants
        .filter((v) => v.attributeValues.some((attr) => attr.attributeId === 6))
        .flatMap((v) => v.attributeValues.filter((attr) => attr.attributeId === 1).map((attr) => attr.id.toString())),
    );

    return transformedVariants.colors.map((color) => ({
      ...color,
      isDisabled: !(singleAttributeColorVariants.includes(color.id) || colorsWithButtons.has(color.id)),
    }));
  }, [selectedButton, variants, transformedVariants.colors]);

  // Find the first valid button for auto-selection
  const getFirstValidButton = (colorId: string | null): string | null => {
    if (!colorId) return null;

    const singleAttributeVariant = variants.find((v) => v.attributeValues.length === 1 && v.attributeValues[0].id.toString() === colorId);
    if (singleAttributeVariant) return null; // No button for single-attribute variants

    const validVariantsForColor = variants.filter((variant) =>
      variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === colorId),
    );

    const firstValidButton = validVariantsForColor
      .flatMap((variant) => variant.attributeValues.filter((attr) => attr.attributeId === 6))
      .map((attr) => attr.slug)[0];

    return firstValidButton || null;
  };

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
      {transformedVariants.colors.length > 0 && (
        <div className="mb-3 space-y-6">
          <ColorSelector
            label={colorLabel}
            colors={validColors}
            selectedColor={selectedColor}
            onColorChange={(color) => {
              dispatch(setSelectedColor(color));
              if (!color) {
                dispatch(setSelectedButton(null));
                dispatch(setSelectedVariant(null));
                return;
              }

              // Check for single-attribute variant
              const singleAttrVariant = variants.find(
                (v) => v.attributeValues.length === 1 && v.attributeValues[0].id.toString() === color,
              );
              if (singleAttrVariant) {
                dispatch(setSelectedVariant(singleAttrVariant));
                dispatch(setSelectedButton(null));
                return;
              }

              // Auto-select the first valid button for multi-attribute variants
              const firstValidButton = getFirstValidButton(color);
              dispatch(setSelectedButton(firstValidButton));

              // Find and set the matching variant
              const matchingVariant = findMatchingVariant(variants, color, firstValidButton);
              dispatch(setSelectedVariant(matchingVariant));
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
            onOptionChange={(button) => {
              dispatch(setSelectedButton(button));
              const matchingVariant = findMatchingVariant(variants, selectedColor, button);
              dispatch(setSelectedVariant(matchingVariant));
            }}
          />
        </div>
      )}
    </div>
  );
}
