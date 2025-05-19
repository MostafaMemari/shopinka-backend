import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tag, TagForm } from '@/types/app/tag.type'
import { tagSchema } from '@/libs/validators/tag.schema'
import { useFormSubmit } from '../useFormSubmit'
import { errorTagMessage } from '@/messages/tagMessages'
import { createTag, getTags, updateTag } from '@/libs/api/tag.api'

export function useTags({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchTag = () => getTags(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Tags, params],
    queryFn: fetchTag,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseTagFormProps {
  initialData?: Tag
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useTagForm = ({ initialData, isUpdate = false, handleModalClose }: UseTagFormProps) => {
  const defaultValues: TagForm = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? null,
    thumbnailImageId: initialData?.thumbnailImageId ?? null
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TagForm>({
    defaultValues,
    resolver: yupResolver(tagSchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<TagForm>({
    createApi: createTag,
    updateApi: updateTag,
    errorMessages: errorTagMessage,
    queryKey: QueryKeys.Tags,
    successMessage: isUpdate ? 'برچسب با موفقیت به‌روزرسانی شد' : 'برچسب با موفقیت ایجاد شد',
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
