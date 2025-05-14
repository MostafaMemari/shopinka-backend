'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { productFormSchema } from '@/libs/validators/product.schema'
import { Product, ProductStatus, ProductType } from '@/types/app/product'
import { createProduct, getProductById, getProducts, removeProduct, updateProduct } from '@/libs/api/product.api'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { RobotsTag } from '@/types/enums/robotsTag'
import { handleSeoSave } from '@/libs/services/seo/seo.service'
import { cleanObject } from '@/utils/formatters'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { type InferType } from 'yup'

type ProductFormType = InferType<typeof productFormSchema>

const errorProductMessage = {
  400: 'اطلاعات وارد شده نامعتبر است',
  404: 'محصول مورد نظر یافت نشد',
  409: 'محصولی با این مشخصات قبلاً ثبت شده است',
  500: 'خطای سیستمی رخ داد'
}

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getProducts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Products, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseProductFormProps {
  id?: number | null
  initialData?: Product
  methods: UseFormReturn<ProductFormType>
}

interface ApiResponse {
  status: number
  data?: {
    id: number
  }
}

export const useProductForm = ({ id, initialData, methods }: UseProductFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(!!id)

  const isUpdate = !!id || !!initialData

  useEffect(() => {
    if (id && !initialData) {
      const fetchProduct = async () => {
        try {
          const response = await getProductById(id)
          const product = response.data

          if (product) {
            Object.entries(product).forEach(([key, value]) => {
              if (key in methods.getValues() && typeof value !== 'object') {
                methods.setValue(key as keyof ProductFormType, value ?? null)
              }
            })
          }
        } catch (err) {
          showToast({ type: 'error', message: 'خطا در بارگذاری محصول' })
        } finally {
          setIsLoading(false)
        }
      }

      fetchProduct()
    } else {
      setIsLoading(false)
    }
  }, [id, initialData, methods])

  const handleClose = useCallback(() => {
    methods.reset()
    router.push('/products')
  }, [methods, router])

  const { isLoading: submitLoading, onSubmit: submitForm } = useFormSubmit<ProductFormType>({
    createApi: createProduct as any,
    updateApi: async (productId: string, formData: Partial<ProductFormType>) => {
      if (!id) throw new Error('Product ID is required for update')

      return updateProduct(Number(productId), formData as unknown as Partial<Product>)
    },
    errorMessages: errorProductMessage,
    queryKey: QueryKeys.Products,
    successMessage: isUpdate ? 'محصول با موفقیت به‌روزرسانی شد' : 'محصول با موفقیت ایجاد شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    initialData: initialData ? { id: String(initialData.id), type: initialData.type || ProductType.SIMPLE } : id ? { id: String(id) } : undefined,
    isUpdate
  })

  const handleButtonClick = useCallback(
    async (type: 'cancel' | 'draft' | 'publish') => {
      if (type === 'cancel') {
        handleClose()

        return
      }

      await methods.handleSubmit(async data => {
        setIsLoading(true)

        try {
          const status = type === 'publish' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT

          const cleanedData = {
            ...cleanObject(data),
            status,
            galleryImageIds: data.galleryImageIds ?? [],
            categoryIds: data.categoryIds ?? [],
            attributeIds: data.attributeIds ?? []
          } as ProductFormType

          const result = await submitForm(cleanedData, handleClose)
          const response = result as unknown as ApiResponse

          if (response && response.status >= 200 && response.status < 300) {
            const productId = isUpdate ? id : response.data?.id

            if (productId) {
              const seoResponse = await handleSeoSave('product', productId, cleanedData)

              if (seoResponse.status !== 200 && seoResponse.status !== 201) {
                if (!isUpdate) await removeProduct(productId.toString())

                showToast({ type: 'error', message: 'خطا در ذخیره SEO' })
              }
            }
          }
        } catch (error) {
          showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
        } finally {
          setIsLoading(false)
        }
      })()
    },
    [methods, submitForm, handleClose, id, isUpdate]
  )

  return {
    isLoading: isLoading || submitLoading,
    handleButtonClick,
    handleClose
  }
}
