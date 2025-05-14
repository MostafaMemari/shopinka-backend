import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AttributeValueSchema } from '@/libs/validators/attributeValues.schema'
import { createAttributeValues, updateAttributeValues } from '@/libs/api/attributeValues.api'
import { AttributeValueForm, AttributeType } from '@/types/app/productAttributes'
import { errorAttributeMessage } from '@/messages/auth/attributeMessages'
import { QueryKeys } from '@/types/enums/query-keys'
import { useFormSubmit } from '../useFormSubmit'

interface UseAttributeValueFormProps {
  initialData?: Partial<AttributeValueForm & { id: string }>
  attributeType: AttributeType
  attributeId?: number
  isUpdate?: boolean
}

export const useAttributeValueForm = ({ initialData, attributeType, attributeId, isUpdate = false }: UseAttributeValueFormProps) => {
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
    resolver: yupResolver(AttributeValueSchema(attributeType)),
    context: { type: attributeType }
  })

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

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
    onSubmit: handleSubmit(data => onSubmit(data, handleClose)),
    handleClose
  }
}
