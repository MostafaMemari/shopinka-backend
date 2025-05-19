import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormSubmit } from '../useFormSubmit'
import { Shipping, ShippingForm } from '@/types/app/shipping.type'
import { createShipping, getShippings, updateShipping } from '@/libs/api/shipping.api'
import { shippingSchema } from '@/libs/validators/shipping.schema'
import { errorShippingMessage } from '@/messages/shippingMessages'

export function useShippings({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchShipping = () => getShippings(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Shippings, params],
    queryFn: fetchShipping,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseShippingFormProps {
  initialData?: Shipping
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useShippingForm = ({ initialData, isUpdate = false, handleModalClose }: UseShippingFormProps) => {
  const defaultValues: ShippingForm = {
    name: initialData?.name ?? '',
    price: initialData?.price ?? null,
    estimatedDays: initialData?.estimatedDays ?? null,
    isActive: initialData?.isActive ?? true
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ShippingForm>({
    defaultValues,
    resolver: yupResolver(shippingSchema)
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const { isLoading, onSubmit } = useFormSubmit<ShippingForm>({
    createApi: createShipping,
    updateApi: updateShipping,
    errorMessages: errorShippingMessage,
    queryKey: QueryKeys.Shippings,
    successMessage: isUpdate ? 'حمل و نقل با موفقیت به‌روزرسانی شد' : 'حمل و نقل با موفقیت ایجاد شد',
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
