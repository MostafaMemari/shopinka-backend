import { createCategory, getCategories, updateCategory } from '@/libs/api/category.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryFormSchema } from '@/libs/validators/category.schema'
import { CategoryForm, Category } from '@/types/app/category.type'
import { useFormSubmit } from '../useFormSubmit'
import { RobotsTag } from '@/types/enums/robotsTag'
import { type InferType } from 'yup'
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
}

type CategoryFormType = InferType<typeof categoryFormSchema>

export const useCategoryForm = ({ initialData, isUpdate = false }: UseCategoryFormProps) => {
  const defaultValues: CategoryFormType = {
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
  } = useForm<CategoryFormType>({
    defaultValues,
    resolver: yupResolver(categoryFormSchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<CategoryForm>({
    createApi: createCategory,
    updateApi: updateCategory,
    errorMessages: errorCategoryMessage,
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
