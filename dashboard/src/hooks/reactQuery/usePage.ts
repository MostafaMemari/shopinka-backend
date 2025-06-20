import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { pageSchema } from '@/libs/validators/page.schema'
import { useFormSubmit } from '../useFormSubmit'
import { errorPageMessage } from '@/messages/pageMessages'
import { createPage, getPages, updatePage } from '@/libs/api/page.api'
import { Page, PageForm } from '@/types/app/page.type'

export function usePages({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchPage = () => getPages(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Pages, params],
    queryFn: fetchPage,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UsePageFormProps {
  initialData?: Page
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const usePageForm = ({ initialData, isUpdate = false, handleModalClose }: UsePageFormProps) => {
  const defaultValues: PageForm = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? null
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<PageForm>({
    defaultValues,
    resolver: yupResolver(pageSchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<PageForm>({
    createApi: createPage,
    updateApi: updatePage,
    errorMessages: errorPageMessage,
    queryKey: QueryKeys.Pages,
    successMessage: isUpdate ? 'صفحه با موفقیت به‌روزرسانی شد' : 'صفحه با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
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
