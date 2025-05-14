import { getCategories } from '@/libs/api/category.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToast } from '@/utils/showToast'
import { categorySchema } from '@/libs/validators/category.schema'
import { createCategory, updateCategory } from '@/libs/api/category.api'
import { CategoryForm, Category } from '@/types/app/category'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import getChangedFields from '@/utils/getChangedFields'
import { errorCategoryMessage } from '@/messages/auth/categoryMessages.'
import { useFormSubmit } from '../useFormSubmit'

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

export const useCategoryForm = ({ initialData, isUpdate = false }: UseCategoryFormProps) => {
  const defaultValues: CategoryForm = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? null,
    parentId: initialData?.parentId ?? null,
    thumbnailImageId: initialData?.thumbnailImageId ?? null
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CategoryForm>({
    defaultValues,
    resolver: yupResolver(categorySchema)
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
