'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import { Attribute, ProductType } from '@/types/app/productAttributes.type'

const useVariants = (productType: ProductType, attributeIds: number[]) => {
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
    if (productType === 'VARIABLE' && attributesData?.data?.items) {
      const validAttributeIds = attributeIds.filter(id => attributesData.data.items.some((attr: Attribute) => attr.id === id))

      if (JSON.stringify(validAttributeIds) !== JSON.stringify(attributeIds)) {
        setValue('attributeIds', validAttributeIds, { shouldValidate: true })
      }
    } else if (productType === 'SIMPLE') {
      if (attributeIds.length > 0) {
        setValue('attributeIds', [], { shouldValidate: true })
      }

      if (attributeIds.length > 0) {
        setValue('attributeValuesIds', [], { shouldValidate: true })
      }
    }
  }, [productType, attributesData, attributeIds, setValue])

  return {
    attributesData,
    isLoadingAttributes,
    isFetchingAttributes,
    errorAttributes
  }
}

export default useVariants
