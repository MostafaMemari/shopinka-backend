import { Attribute, Variant, VariantCombination } from '@/types/productAttributes'

export const generateCombinations = (variants: Variant[], attributes: Attribute[]): VariantCombination[] => {
  if (variants.length === 0 || variants.every(v => v.values.length === 0)) {
    return []
  }

  const result: VariantCombination[] = []

  const combine = (current: VariantCombination, variantIndex: number) => {
    if (variantIndex >= variants.length) {
      if (Object.keys(current).length > 0) {
        result.push({ ...current })
      }

      return
    }

    const variant = variants[variantIndex]
    const attribute = attributes.find(a => a.id === variant.attributeId)

    if (!attribute) return

    combine(current, variantIndex + 1)

    variant.values.forEach(value => {
      combine({ ...current, [attribute.name]: value }, variantIndex + 1)
    })
  }

  combine({}, 0)

  return result
}
