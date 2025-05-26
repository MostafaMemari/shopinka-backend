'use client';

import { useMemo } from 'react';
import { IColor } from '@/lib/types/colors';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { productVariant } from '@/Modules/product/types/productType';
import { attribute, attributeValues } from '@/shared/types/attributeType';
import { useVariant } from '../VariantProvider';

interface TransformedVariants {
  colors: IColor[];
  buttons: { slug: string; label: string }[];
}

export const transformVariants = (variants: productVariant[], attributes: attribute[]): TransformedVariants => {
  const colors: IColor[] = [];
  const buttons: { slug: string; label: string }[] = [];

  const uniqueColors = new Map<string, IColor>();
  const uniqueButtons = new Map<string, { slug: string; label: string }>();

  variants.forEach((variant) => {
    variant.attributeValues.forEach((attr: attributeValues) => {
      const colorAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'COLOR');
      if (colorAttr && attr.colorCode && !uniqueColors.has(attr.slug)) {
        uniqueColors.set(attr.slug, {
          id: attr.id.toString(),
          name: attr.name,
          color: attr.colorCode,
        });
      }

      const buttonAttr = attributes.find((a) => a.id === attr.attributeId && a.type === 'BUTTON');
      if (buttonAttr && !uniqueButtons.has(attr.slug)) {
        uniqueButtons.set(attr.slug, {
          slug: attr.slug,
          label: attr.buttonLabel || attr.name,
        });
      }
    });
  });

  return {
    colors: Array.from(uniqueColors.values()),
    buttons: Array.from(uniqueButtons.values()),
  };
};

interface Props {
  variants: productVariant[];
  attributes: attribute[];
}

export default function ProductVariants({ variants, attributes }: Props) {
  const { selectedColor, selectedButton, setSelectedColor, setSelectedButton } = useVariant();

  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  const validButtons = useMemo(() => {
    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some((attr) => attr.attributeId === 1 && attr.id.toString() === selectedColor),
    );
    const validButtonSlugs = validVariants
      .map((variant) => variant.attributeValues.find((attr) => attr.attributeId === 6)?.slug)
      .filter((slug): slug is string => !!slug);

    return transformedVariants.buttons.filter((button) => validButtonSlugs.includes(button.slug));
  }, [selectedColor, variants, transformedVariants.buttons]);

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  return (
    <div className="mb-4">
      {transformedVariants.colors.length > 0 && (
        <div className="mb-3 space-y-6">
          <ColorSelector
            label={colorLabel}
            colors={transformedVariants.colors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>
      )}
      {validButtons.length > 0 && (
        <div className="mb-3 space-y-6">
          <ButtonSelector title={buttonLabel} options={validButtons} selectedOption={selectedButton} onOptionChange={setSelectedButton} />
        </div>
      )}
    </div>
  );
}
