import { ProductVariant } from '@/types/app/productVariant.type'

export const updateProductVariant = (
  variants: ProductVariant[],
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>,
  id: string,
  updatedFields: Partial<ProductVariant>
) => {
  setVariants(variants.map(variant => (String(variant.id) === id ? { ...variant, ...updatedFields } : variant)))
}
