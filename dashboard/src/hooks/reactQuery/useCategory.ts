import { createCategory, getCategories, updateCategory } from '@/libs/api/category.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CategoryForm, categoryFormSchema } from '@/libs/validators/category.schema'
import { Category, CategoryType } from '@/types/app/category.type'
import { useFormSubmit } from '../useFormSubmit'
import { RobotsTag } from '@/types/enums/robotsTag'
import { errorCategoryMessage } from '@/messages/categoryMessages'

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getCategories(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseCategoryFormProps {
  initialData?: Category
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useCategoryForm = ({ initialData, isUpdate = false, handleModalClose }: UseCategoryFormProps) => {
  const defaultValues: CategoryForm = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    parentId: initialData?.parentId || null,
    type: initialData?.type ?? CategoryType.PRODUCT,
    thumbnailImageId: initialData?.thumbnailImageId ?? null,

    seo_title: initialData?.seoMeta?.title ?? '',
    seo_description: initialData?.seoMeta?.description ?? '',
    seo_keywords: initialData?.seoMeta?.keywords ?? [],
    seo_canonicalUrl: initialData?.seoMeta?.canonicalUrl ?? '',
    seo_ogTitle: initialData?.seoMeta?.ogTitle ?? '',
    seo_ogDescription: initialData?.seoMeta?.ogDescription ?? '',
    seo_ogImage: initialData?.seoMeta?.ogImage ?? null,
    seo_robotsTag: initialData?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CategoryForm>({
    defaultValues,
    resolver: yupResolver(categoryFormSchema)
  })

  const handleClose = useCallback(() => {
    reset()
    handleModalClose?.()
  }, [reset, handleModalClose])

  const { isLoading, onSubmit } = useFormSubmit<CategoryForm>({
    createApi: createCategory,
    updateApi: updateCategory,
    errorMessages: errorCategoryMessage,
    queryKey: QueryKeys.Categories,
    successMessage: isUpdate ? 'دسته‌بندی با موفقیت به‌روزرسانی شد' : 'دسته‌بندی با موفقیت ایجاد شد',
    initialData: initialData
      ? {
          ...initialData,
          id: String(initialData.id),
          seo_canonicalUrl: initialData.seoMeta?.canonicalUrl,
          seo_description: initialData.seoMeta?.description,
          seo_keywords: initialData.seoMeta?.keywords,
          seo_ogDescription: initialData.seoMeta?.ogDescription,
          seo_ogTitle: initialData.seoMeta?.ogTitle,
          seo_ogImage: initialData.seoMeta?.ogImage,
          seo_robotsTag: initialData.seoMeta?.robotsTag,
          seo_title: initialData.seoMeta?.title
        }
      : undefined,
    isUpdate
  })

  return {
    control,
    errors,
    setValue,
    isLoading,
    onSubmit: handleSubmit(data => onSubmit(data, handleModalClose ?? (() => {}))),
    handleClose
  }
}
