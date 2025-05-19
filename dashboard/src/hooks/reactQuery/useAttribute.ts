import { createAttribute, getAttributes, updateAttribute } from '@/libs/api/attributes.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { attributeSchema } from '@/libs/validators/attribute.schema'
import { AttributeFormType, Attribute, AttributeType } from '@/types/app/productAttributes.type'
import { errorAttributeMessage } from '@/messages/attributeMessages'
import { useFormSubmit } from '../useFormSubmit'

export function useAttribute({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchAttribute = () => getAttributes(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Attributes, params],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseAttributeFormProps {
  initialData?: Attribute
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useAttributeForm = ({ initialData, isUpdate = false, handleModalClose }: UseAttributeFormProps) => {
  const defaultValues: AttributeFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    type: initialData?.type ?? AttributeType.COLOR,
    description: initialData?.description ?? ''
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AttributeFormType>({
    defaultValues,
    resolver: yupResolver(attributeSchema)
  })

  const handleClose = useCallback(() => {
    reset()
    handleModalClose?.()
  }, [reset, handleModalClose])

  const { isLoading, onSubmit } = useFormSubmit<AttributeFormType>({
    createApi: createAttribute,
    updateApi: updateAttribute,
    errorMessages: errorAttributeMessage,
    queryKey: QueryKeys.Attributes,
    successMessage: isUpdate ? 'ویژگی با موفقیت به‌روزرسانی شد' : 'ویژگی با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی ویژگی رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate,

    preprocessData: (data: AttributeFormType) => {
      const cleanedData = { ...data }

      if (!cleanedData.description) {
        cleanedData.description = null
      }

      return cleanedData as AttributeFormType
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
