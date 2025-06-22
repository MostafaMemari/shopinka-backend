import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tag, TagForm, TagType } from '@/types/app/tag.type'
import { tagFormSchema } from '@/libs/validators/tag.schema'
import { useFormSubmit } from '../useFormSubmit'
import { errorTagMessage } from '@/messages/tagMessages'
import { createTag, getTags, updateTag } from '@/libs/api/tag.api'
import { RobotsTag } from '@/types/enums/robotsTag'

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
    type: initialData?.type ?? TagType.BLOG,
    description: initialData?.description ?? null,
    tagIds: initialData?.tagIds ?? null,
    categoryIds: initialData?.categoryIds ?? null,
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
  } = useForm<TagForm>({
    defaultValues,
    resolver: yupResolver(tagFormSchema)
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
