'use client'

import { createProductVariant, getProductVariants, updateProductVariant } from '@/libs/api/productVariants.api'
import { errorProductVariantMessage } from '@/messages/productVariant.message'
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useFormSubmit } from '../useFormSubmit'
import { useCallback } from 'react'
import { productVariantSchema } from '@/libs/validators/productVariant.schema'

export function useProductVariants({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchProductVariants = () => getProductVariants(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.ProductVariants, params],
    queryFn: fetchProductVariants,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseProductVariantFormProps {
  productId: number
  initialData?: ProductVariant
  isUpdate?: boolean
}

export const useProductVariantForm = ({ initialData, productId, isUpdate = false }: UseProductVariantFormProps) => {
  const defaultValues: ProductVariantForm = {
    sku: initialData?.sku ?? '',
    shortDescription: initialData?.shortDescription ?? '',
    quantity: initialData?.quantity ?? null,
    basePrice: initialData?.basePrice ?? null,
    salePrice: initialData?.salePrice ?? null,
    mainImageId: initialData?.mainImageId ?? null,
    width: initialData?.width ?? null,
    height: initialData?.height ?? null,
    length: initialData?.length ?? null,
    weight: initialData?.weight ?? null,

    attributeValueIds: []
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductVariantForm>({
    defaultValues,
    resolver: yupResolver(productVariantSchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<ProductVariantForm>({
    createApi: async (formData: ProductVariantForm) => {
      const response = await createProductVariant(productId, formData)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },
    updateApi: (id, data) => updateProductVariant(Number(id), data),
    errorMessages: errorProductVariantMessage,
    queryKey: [QueryKeys.ProductVariants],
    successMessage: isUpdate ? 'متغییر با موفقیت به‌روزرسانی شد' : 'متغییر با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id), attributeValueIds: [] } : undefined,
    isUpdate
  })

  return {
    control,
    errors,
    setValue,
    isLoading,
    onSubmit: handleSubmit(data => onSubmit(data, handleClose)),
    handleClose
  }
}
