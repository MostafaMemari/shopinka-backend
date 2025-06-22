import { useState, useCallback } from 'react'
import { showToast } from '@/utils/showToast'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { getChangedFields } from '@/utils/getChangedFields'

interface UseFormSubmitProps<T extends Record<string, any>> {
  createApi?: (data: T) => Promise<{ status: number; data?: any }>
  updateApi?: (id: string, data: Partial<T>) => Promise<{ status: number; data?: any }>
  errorMessages: Record<number, string>
  queryKey: QueryKeys | QueryKeys[]
  successMessage: string
  noChangeMessage?: string
  errorMessage?: string
  initialData?: Partial<T & { id: string }>
  isUpdate?: boolean
  preprocessData?: (data: T) => T
  onSuccess?: (response: { status: number; data?: any }) => void
}

interface UseFormSubmitResult<T extends Record<string, any>> {
  isLoading: boolean
  onSubmit: (formData: T, handleClose: () => void) => Promise<ApiResponse<T> | undefined>
}

interface ApiResponse<T> {
  status: number
  data?: T
}

export const useFormSubmit = <T extends Record<string, any>>({
  createApi,
  updateApi,
  errorMessages,
  queryKey,
  successMessage,
  noChangeMessage = 'هیچ تغییری اعمال نشده است',
  errorMessage = 'خطای سیستمی رخ داد',
  initialData,
  isUpdate = false,
  preprocessData
}: UseFormSubmitProps<T>): UseFormSubmitResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const onSubmit = useCallback(
    async (formData: T, handleClose: () => void): Promise<ApiResponse<T> | undefined> => {
      setIsLoading(true)

      try {
        const processedData = preprocessData ? preprocessData(formData) : formData
        const cleanedData = cleanObject(processedData)

        if (isUpdate && initialData?.id && updateApi) {
          const changedData = getChangedFields(initialData as unknown as T, cleanedData, ['mainImageId', 'mainImage', 'thumbnailImageId'])

          if (Object.keys(changedData).length === 0) {
            showToast({ type: 'info', message: noChangeMessage })
            setIsLoading(false)

            return undefined
          }

          const response = await updateApi(String(initialData.id), changedData)

          const apiErrorMessage = handleApiError(response.status, errorMessages)

          if (apiErrorMessage) {
            showToast({ type: 'error', message: apiErrorMessage })

            return response
          }

          if (response.status === 200) {
            showToast({ type: 'success', message: successMessage })
            invalidate(queryKey)
            handleClose()

            return {
              status: 200,
              data: response.data
            }
          }
        } else if (createApi) {
          const response = await createApi(cleanedData as T)
          const apiErrorMessage = handleApiError(response.status, errorMessages)

          if (apiErrorMessage) {
            showToast({ type: 'error', message: apiErrorMessage })

            return response
          }

          if (response.status === 201 || response.status === 200) {
            showToast({ type: 'success', message: successMessage })
            invalidate(queryKey)
            handleClose()

            return {
              status: 201,
              data: response.data
            }
          }
        }
      } catch (error: any) {
        showToast({ type: 'error', message: isUpdate ? `خطایی در به‌روزرسانی رخ داد` : errorMessage })
      } finally {
        setIsLoading(false)
      }
    },
    [createApi, updateApi, errorMessages, queryKey, successMessage, noChangeMessage, errorMessage, initialData, isUpdate, invalidate, preprocessData]
  )

  return { isLoading, onSubmit }
}
