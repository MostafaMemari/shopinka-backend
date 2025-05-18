import { ProductVariant } from '@/types/app/productVariant.type'

export const updateProductVariant = (
  variants: ProductVariant[],
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>,
  id: string,
  updatedFields: Partial<ProductVariant>
) => {
  console.log(`Updating variant id: ${id}, updated fields:`, updatedFields)
  setVariants(variants.map(variant => (String(variant.id) === id ? { ...variant, ...updatedFields } : variant)))
}
