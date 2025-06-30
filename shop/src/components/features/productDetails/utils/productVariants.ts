import { Attribute, AttributeValues } from '@/types/attributeType';
import { ProductVariant } from '@/types/productType';

export interface IColor {
  id: string;
  name: string;
  color: string;
  isDisabled?: boolean;
}

export interface TransformedVariants {
  colors: IColor[];
  buttons: { slug: string; label: string; isDisabled?: boolean }[];
}

export const transformVariants = (variants: ProductVariant[], attributes: Attribute[]): TransformedVariants => {
  const uniqueColors = new Map<string, IColor>();
  const uniqueButtons = new Map<string, { slug: string; label: string; isDisabled?: boolean }>();

  variants.forEach((variant) => {
    variant.attributeValues.forEach((attr: AttributeValues) => {
      const attribute = attributes.find((a) => a.id === attr.attributeId);
      if (!attribute) return;

      if (attribute.type === 'COLOR' && attr.colorCode && !uniqueColors.has(attr.slug)) {
        uniqueColors.set(attr.slug, {
          id: attr.id.toString(),
          name: attr.name,
          color: attr.colorCode,
          isDisabled: false,
        });
      } else if (attribute.type === 'BUTTON' && !uniqueButtons.has(attr.slug)) {
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

export const findMatchingVariant = (
  variants: ProductVariant[],
  selectedColor: string | null,
  selectedButton: string | null,
  attributes: Attribute[],
): ProductVariant | null => {
  const colorAttrId = attributes.find((attr) => attr.type === 'COLOR')?.id;
  const buttonAttrId = attributes.find((attr) => attr.type === 'BUTTON')?.id;

  return (
    variants.find((variant) => {
      const hasColor =
        !colorAttrId || selectedColor === null
          ? true
          : variant.attributeValues.some((attr) => attr.attributeId === colorAttrId && attr.id.toString() === selectedColor);
      const hasButton =
        !buttonAttrId || selectedButton === null
          ? true
          : variant.attributeValues.some((attr) => attr.attributeId === buttonAttrId && attr.slug === selectedButton);

      return hasColor && hasButton;
    }) || null
  );
};

export const getDefaultSelections = (
  variants: ProductVariant[],
  attributes: Attribute[],
  defaultVariantId?: number,
): { defaultColor: string | null; defaultButton: string | null; defaultVariant: ProductVariant | null } => {
  if (!defaultVariantId) {
    return { defaultColor: null, defaultButton: null, defaultVariant: null };
  }

  const defaultVariant = variants.find((v) => v.id === defaultVariantId);
  if (!defaultVariant) {
    return { defaultColor: null, defaultButton: null, defaultVariant: null };
  }

  let defaultColor: string | null = null;
  let defaultButton: string | null = null;

  defaultVariant.attributeValues.forEach((attr) => {
    const attribute = attributes.find((a) => a.id === attr.attributeId);
    if (attribute?.type === 'COLOR') {
      defaultColor = attr.id.toString();
    } else if (attribute?.type === 'BUTTON') {
      defaultButton = attr.slug;
    }
  });

  return { defaultColor, defaultButton, defaultVariant };
};
