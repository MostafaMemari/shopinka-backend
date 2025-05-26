import { defaultVariantProduct } from '@/libs/api/product.api'
import { showToast } from '@/utils/showToast'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateQuery } from '../useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'

interface UseDefaultVariantProps {
  productId: number
  variantId: number
  onSuccess?: (data: any, isDefault: boolean) => void
  onError?: (error: unknown) => void
}

export const useDefaultVariant = ({ productId, variantId, onSuccess, onError }: UseDefaultVariantProps) => {
  const { invalidate } = useInvalidateQuery()

  const { mutate, isPending } = useMutation({
    mutationFn: async (setAsDefault: boolean) => {
      if (!setAsDefault) {
        const response = await defaultVariantProduct(productId, null)

        return response.data
      }

      const response = await defaultVariantProduct(productId, variantId)

      return response.data
    },
    onSuccess: (data, setAsDefault) => {
      showToast({
        type: 'success',
        message: setAsDefault ? 'پیش‌فرض تنظیم شد!' : 'پیش‌فرض حذف شد!'
      })

      invalidate(QueryKeys.Product)

      onSuccess?.(data, setAsDefault)
    },
    onError: (error: any) => {
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'خطا در تنظیم پیش‌فرض!'
      })
      console.error('Error setting/removing default variant:', error)
      onError?.(error)
    }
  })

  return {
    toggleDefaultVariant: (isDefault: boolean) => mutate(!isDefault),
    isLoading: isPending
  }
}
