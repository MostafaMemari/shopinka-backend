import { productVariant } from '@/Modules/product/types/productType';
import React, { useState, useMemo } from 'react';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { attribute, attributeValues } from '@/shared/types/attributeType';

interface IColor {
  id: string;
  name: string;
  color: string;
}

interface TransformedVariants {
  colors: { id: string; name: string; color: string }[];
  buttons: { slug: string; label: string }[];
}

interface Props {
  variants: productVariant[];
  attributes: attribute[];
}

const transformVariants = (variants: productVariant[], attributes: attribute[]): TransformedVariants => {
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

function ProductVariants({ variants, attributes }: Props) {
  const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

  const [selectedColor, setSelectedColor] = useState<string>(transformedVariants.colors.length > 0 ? transformedVariants.colors[0].id : '');
  const [selectedButton, setSelectedButton] = useState<string>(
    transformedVariants.buttons.length > 0 ? transformedVariants.buttons[0].slug : '',
  );

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  const handleColorChange = (id: string) => {
    console.log('Selected Color:', id);
    setSelectedColor(id);
  };

  const handleButtonChange = (slug: string) => {
    console.log('Selected Button:', slug);
    setSelectedButton(slug);
  };

  return (
    <div className="mb-4">
      {transformedVariants.colors.length > 0 && (
        <div className="mb-3 space-y-6">
          <ColorSelector
            label={colorLabel}
            colors={transformedVariants.colors}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
          />
        </div>
      )}
      {transformedVariants.buttons.length > 0 && (
        <div className="mb-3 space-y-6">
          <ButtonSelector
            title={buttonLabel}
            options={transformedVariants.buttons}
            selectedOption={selectedButton}
            onOptionChange={handleButtonChange}
          />
        </div>
      )}
    </div>
  );
}

export default ProductVariants;
