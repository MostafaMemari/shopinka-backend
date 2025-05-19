'use client'

import { createGallery, getGalleries, updateGallery } from '@/libs/api/gallery.api'
import { getGalleryItems } from '@/libs/api/galleyItem.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { gallerySchema } from '@/libs/validators/gallery.schema'
import { GalleryForm, Gallery } from '@/types/app/gallery.type'
import { errorGalleryMessage } from '@/messages/galleryMessages'
import { useFormSubmit } from '../useFormSubmit'

export function useGalleryItems({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGalleryItems = () => getGalleryItems(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.GalleryItems, params],
    queryFn: fetchGalleryItems,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useGallery({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGallery = () => getGalleries(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Galleries, params],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseGalleryFormProps {
  initialData?: Gallery
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useGalleryForm = ({ initialData, isUpdate = false, handleModalClose }: UseGalleryFormProps) => {
  const defaultValues: GalleryForm = {
    title: initialData?.title ?? '',
    description: initialData?.description ?? ''
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<GalleryForm>({
    defaultValues,
    resolver: yupResolver(gallerySchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<GalleryForm>({
    createApi: createGallery,
    updateApi: updateGallery,
    errorMessages: errorGalleryMessage,
    queryKey: QueryKeys.Galleries,
    successMessage: isUpdate ? 'گالری با موفقیت ویرایش شد' : 'گالری با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در ویرایش گالری رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate
  })

  return {
    control,
    errors,
    isLoading,
    onSubmit: handleSubmit(data => onSubmit(data, handleModalClose ?? (() => {}))),
    handleClose
  }
}
