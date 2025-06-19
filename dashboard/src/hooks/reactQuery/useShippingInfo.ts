import { getAttributes } from '@/libs/api/attributes.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { errorAttributeMessage } from '@/messages/attributeMessages'
import { useFormSubmit } from '../useFormSubmit'
import { shippingInfoSchema } from '@/libs/validators/shippingInfo.schema'
import { ShippingInfo, ShippingInfoForm } from '@/types/app/shippingInfo.type'
import { addShippingInfo, updateShippingInfo } from '@/libs/api/shippingInfo.api'

export function useShippingInfo({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchAttribute = () => getAttributes(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Attributes, params],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseShippingInfoFormProps {
  initialData?: ShippingInfo
  isUpdate?: boolean
  orderId?: number
  handleModalClose?: () => void
}

export const useShippingInfoForm = ({ initialData, orderId, isUpdate = false, handleModalClose }: UseShippingInfoFormProps) => {
  const defaultValues: ShippingInfoForm = {
    orderId: initialData?.orderId ?? orderId ?? null,
    trackingCode: initialData?.trackingCode ?? ''
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ShippingInfoForm>({
    defaultValues,
    resolver: yupResolver(shippingInfoSchema)
  })

  const handleClose = useCallback(() => {
    reset()
    handleModalClose?.()
  }, [reset, handleModalClose])

  const { isLoading, onSubmit } = useFormSubmit<ShippingInfoForm>({
    createApi: addShippingInfo,
    updateApi: updateShippingInfo,
    errorMessages: errorAttributeMessage,
    queryKey: [QueryKeys.ShippingInfo, QueryKeys.Orders],
    successMessage: isUpdate ? 'حمل با موفقیت به‌روزرسانی شد' : 'حمل با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی حمل رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate,

    preprocessData: (data: ShippingInfoForm) => {
      const cleanedData = { ...data }

      return cleanedData as ShippingInfoForm
    }
  })

  return {
    control,
    errors,
    isLoading,
    onSubmit: handleSubmit(data => onSubmit(data, handleModalClose ?? (() => {}))),
    handleClose
  }
}
