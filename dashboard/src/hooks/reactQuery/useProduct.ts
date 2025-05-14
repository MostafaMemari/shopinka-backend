'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { productFormSchema } from '@/libs/validators/product.schema'
import { Product, ProductStatus, ProductType } from '@/types/app/product.type'
import { createProduct, getProductById, getProducts, updateProduct } from '@/libs/api/product.api'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { handleSeoSave } from '@/libs/services/seo/seo.service'
import { cleanObject } from '@/utils/formatters'
import { showToast } from '@/utils/showToast'
import { type InferType } from 'yup'
import { GalleryItem } from '@/types/app/gallery'
import { errorProductMessage } from '@/messages/product.message'

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchProducts = () => getProducts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Products, params],
    queryFn: fetchProducts,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

type ProductFormType = InferType<typeof productFormSchema>

interface UseProductFormProps {
  id?: number | null
  initialData?: Product
  methods: UseFormReturn<ProductFormType>
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

            if (product.mainImage) {
              methods.setValue('mainImage' as any, product.mainImage as GalleryItem)
            }

            if (product.galleryImages && Array.isArray(product.galleryImages)) {
              methods.setValue('galleryImages' as any, product.galleryImages as GalleryItem[])
            }
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
        router.push('/products')

        return
      }

      await methods.handleSubmit(async data => {
        setIsLoading(true)

        try {
          const status = type === 'publish' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT

          const cleanedData = cleanObject({
            ...data,
            status,
            galleryImageIds: data.galleryImageIds ?? [],
            categoryIds: data.categoryIds ?? [],
            attributeIds: data.attributeIds ?? []
          })

          await submitForm(cleanedData, () => {})

          if (isUpdate && id) {
            const seoResponse = await handleSeoSave('product', id, cleanedData)

            if (seoResponse.status !== 200 && seoResponse.status !== 201) {
              showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

              return
            }
          }
        } catch (error) {
        } finally {
          setIsLoading(false)
        }
      })()
    },
    [methods, submitForm, id, isUpdate, router]
  )

  return {
    isLoading: isLoading || submitLoading,
    handleButtonClick
  }
}
