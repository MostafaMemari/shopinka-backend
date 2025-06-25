import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAttributeValues, updateAttributeValues } from '@/libs/api/attributeValues.api'
import { AttributeValueForm, AttributeType } from '@/types/app/productAttributes.type'
import { errorAttributeMessage } from '@/messages/attributeMessages'
import { QueryKeys } from '@/types/enums/query-keys'
import { useFormSubmit } from '../useFormSubmit'
import { AttributeValueSchema } from '@/libs/validators/attributeValues.schema'

interface UseAttributeValueFormProps {
  initialData?: Partial<AttributeValueForm & { id: string }>
  attributeType: AttributeType
  attributeId?: number
  isUpdate?: boolean
  handleModalClose?: () => void
}

export const useAttributeValueForm = ({ initialData, attributeId, isUpdate = false, handleModalClose }: UseAttributeValueFormProps) => {
  const defaultValues: AttributeValueForm = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    colorCode: initialData?.colorCode ?? '',
    buttonLabel: initialData?.buttonLabel ?? '',
    attributeId: initialData?.attributeId ?? (attributeId ? String(attributeId) : '')
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AttributeValueForm>({
    defaultValues,
    resolver: yupResolver(AttributeValueSchema)
  })

  const handleClose = useCallback(() => {
    reset()
    handleModalClose?.()
  }, [reset, handleModalClose])

  const { isLoading, onSubmit } = useFormSubmit<AttributeValueForm>({
    createApi: createAttributeValues,
    updateApi: updateAttributeValues,
    errorMessages: errorAttributeMessage,
    queryKey: QueryKeys.Attributes,
    successMessage: isUpdate ? 'متغیر با موفقیت به‌روزرسانی شد' : 'متغیر با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی متغیر رخ داد' : 'خطای سیستمی رخ داد',
    initialData,
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
