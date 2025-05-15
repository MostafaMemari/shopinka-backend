import { useState, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import { Attribute, ProductType, Variant, VariantCombination } from '@/types/app/productAttributes.type'
import { generateCombinations } from '@/views/pages/products/CreateAndUpdate/tabs/variants/generateCombinations'

const useVariants = (productType: ProductType, attributeIds: number[]) => {
  const [variants, setVariants] = useState<Variant[]>([])
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([])
  const { setValue } = useFormContext()

  const {
    data: attributesData,
    isLoading: isLoadingAttributes,
    isFetching: isFetchingAttributes,
    error: errorAttributes
  } = useAttribute({
    enabled: productType === 'VARIABLE',
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (productType === 'VARIABLE' && attributeIds?.length > 0 && attributesData?.data?.items) {
      const currentVariantIds = variants.map(v => v.attributeId)

      const newVariants = attributeIds
        .filter((id: number) => !currentVariantIds.includes(id))
        .map((id: number) => ({
          attributeId: id,
          values: []
        }))

      if (newVariants.length > 0) {
        setVariants(prevVariants => [...prevVariants, ...newVariants])
      }
    }
  }, [attributeIds, attributesData, productType, variants])

  const combinations = useMemo(() => {
    if (productType === 'VARIABLE' && attributesData?.data?.items) {
      return generateCombinations(variants, attributesData.data.items)
    }

    return []
  }, [variants, attributesData, productType])

  const calculateActiveCombinationIds = (selectedCombinations: string[], combinations: VariantCombination[], attributes: Attribute[]): number[][] => {
    return selectedCombinations
      .map(key => {
        const combination = combinations.find(comb => {
          const combinationKey = Object.entries(comb)
            .map(([attrName, value]) => `${attrName}:${value}`)
            .join('|')

          return combinationKey === key
        })

        if (!combination) return null

        const valueIds = Object.entries(combination)

          .map(([attrName, value]) => {
            const attribute = attributes.find(attr => attr.name === attrName)

            if (!attribute) return null
            const valueObj = attribute.values.find(val => val.name === value)

            return valueObj ? valueObj.id : null
          })
          .filter((id): id is number => id !== null)

        return valueIds.length > 0 ? valueIds : null
      })
      .filter((arr): arr is number[] => arr !== null)
  }

  useEffect(() => {
    if (!attributesData?.data?.items) return
    if (productType !== 'SIMPLE' && productType !== 'VARIABLE') return

    if (productType === 'VARIABLE') {
      const activeAttributeIds = variants.filter(v => v.attributeId).map(v => v.attributeId)
      const activeCombinationIds = calculateActiveCombinationIds(selectedCombinations, combinations, attributesData.data.items)

      setValue('attributeIds', activeAttributeIds, { shouldValidate: true })
      //   setValue('attributeValuesIds', activeCombinationIds, { shouldValidate: true })
    } else {
      setValue('attributeIds', [], { shouldValidate: true })
      setValue('attributeValuesIds', [], { shouldValidate: true })
    }
  }, [variants, attributesData?.data?.items, productType, selectedCombinations, setValue, combinations])

  const addVariant = () => {
    const usedAttributeIds = variants.map(v => v.attributeId)
    const availableAttribute = attributesData?.data?.items?.find((attr: Attribute) => !usedAttributeIds.includes(attr.id))

    if (availableAttribute) {
      setVariants([...variants, { attributeId: availableAttribute.id, values: [] }])
    }
  }

  const deleteVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index)

    setVariants(newVariants)

    if (newVariants.length === 0) {
      setSelectedCombinations([])
      setValue('attributeIds', [], { shouldValidate: true })
      setValue('attributeValuesIds', [], { shouldValidate: true })
    }
  }

  const handleVariantTypeChange = (index: number, attributeId: number) => {
    const usedAttributeIds = variants.map(v => v.attributeId)

    if (usedAttributeIds.includes(attributeId)) return
    const newVariants = [...variants]

    newVariants[index].attributeId = attributeId
    newVariants[index].values = []
    setVariants(newVariants)
  }

  const handleVariantValuesChange = (index: number, values: string[]) => {
    const newVariants = [...variants] as Variant[]

    newVariants[index].values = values
    setVariants(newVariants)
  }

  const handleCombinationSelect = (combinationKey: string, value: string) => {
    const updatedSelectedCombinations = value === 'active' ? [...selectedCombinations, combinationKey] : selectedCombinations.filter(key => key !== combinationKey)

    setSelectedCombinations(updatedSelectedCombinations)
    const activeCombinationIds = calculateActiveCombinationIds(updatedSelectedCombinations, combinations, attributesData?.data?.items || [])

    setValue('attributeValuesIds', activeCombinationIds, { shouldValidate: true })
  }

  return {
    variants,
    combinations,
    selectedCombinations,
    attributesData,
    isLoadingAttributes,
    isFetchingAttributes,
    errorAttributes,
    addVariant,
    deleteVariant,
    handleVariantTypeChange,
    handleVariantValuesChange,
    handleCombinationSelect
  }
}

export default useVariants
