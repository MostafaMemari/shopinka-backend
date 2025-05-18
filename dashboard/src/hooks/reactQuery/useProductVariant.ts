'use client'

import { createProductVariant, getProductVariants, updateProductVariant } from '@/libs/api/productVariants.api'
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { QueryKeys } from '@/types/enums/query-keys'
import { RobotsTag } from '@/types/enums/robotsTag'
import { QueryOptions } from '@/types/queryOptions'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

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
  initialData?: ProductVariant
  isUpdate?: boolean
}

export const useProductVariantForm = ({ initialData, isUpdate = false }: UseProductVariantFormProps) => {
  const defaultValues: ProductVariantFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    parentId: initialData?.parentId || null,
    thumbnailImageId: null,

    seo_title: '',
    seo_description: '',
    seo_keywords: [],
    seo_canonicalUrl: '',
    seo_ogTitle: '',
    seo_ogDescription: '',
    seo_ogImage: '',
    seo_robotsTag: RobotsTag.INDEX_FOLLOW
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductVariantFormType>({
    defaultValues,
    resolver: yupResolver(productVariantForm)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<ProductVariantForm>({
    createApi: createProductVariant,
    updateApi: updateProductVariant,
    errorMessages: errorProductVariantMessage,
    queryKey: QueryKeys.Categories,
    successMessage: isUpdate ? 'دسته‌بندی با موفقیت به‌روزرسانی شد' : 'دسته‌بندی با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
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
