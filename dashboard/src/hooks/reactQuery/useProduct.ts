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
import { handleSeoSave } from '@/libs/services/seo/seo.service'
import { cleanObject } from '@/utils/formatters'
import { showToast } from '@/utils/showToast'
import { type InferType } from 'yup'
import { GalleryItem } from '@/types/app/gallery'
import { errorProductMessage } from '@/messages/product.message'
import { useFormSubmit } from '../useFormSubmit'

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
  const [initialProduct, setInitialProduct] = useState<Product | null>(null)
  const isUpdate = !!id || !!initialData

  useEffect(() => {
    if (id && !initialData) {
      setIsLoading(true)
      getProductById(id)
        .then(response => {
          const product = response.data

          console.log(product)

          setInitialProduct(product)

          if (product) {
            Object.entries(product).forEach(([key, value]) => {
              if (key in methods.getValues() && typeof value !== 'object') {
                methods.setValue(key as keyof ProductFormType, value ?? null)
              }
            })

            if (product.seoMeta) {
              methods.setValue('seo_title', product.seoMeta.title)
              methods.setValue('seo_description', product.seoMeta.description)
              methods.setValue('seo_keywords', product.seoMeta.keywords)
              methods.setValue('seo_canonicalUrl', product.seoMeta.canonicalUrl)
              methods.setValue('seo_ogTitle', product.seoMeta.ogTitle)
              methods.setValue('seo_ogDescription', product.seoMeta.ogDescription)
              methods.setValue('seo_ogImage', product.seoMeta.ogImage)
              methods.setValue('seo_robotsTag', product.seoMeta.robotsTag)
            }

            if (product.mainImage) {
              methods.setValue('mainImage' as any, product.mainImage)
            }

            if (product.galleryImages && Array.isArray(product.galleryImages)) {
              methods.setValue('galleryImages' as any, product.galleryImages as GalleryItem[])
            }

            methods.setValue('galleryImageIds', product.galleryImages?.map(img => img.id) || [])
            methods.setValue('categoryIds', product.categories?.map(category => category.id) || [])
            methods.setValue('attributeIds', product.attributes?.map(attribute => attribute.id) || [])
            methods.setValue('attributeValuesIds', product.variants?.map(variant => variant.attributeValues?.map(attr => attr.id)) || [])
          }
        })
        .catch(() => {
          showToast({ type: 'error', message: 'خطا در بارگذاری محصول' })
        })
        .finally(() => setIsLoading(false))
    } else if (initialData) {
      setInitialProduct(initialData)
      Object.entries(initialData).forEach(([key, value]) => {
        if (key in methods.getValues() && typeof value !== 'object') {
          methods.setValue(key as keyof ProductFormType, value ?? null)
        }
      })

      if (initialData.mainImage) {
        methods.setValue('mainImage' as any, initialData.mainImage as GalleryItem)
      }

      if (initialData.galleryImages && Array.isArray(initialData.galleryImages)) {
        methods.setValue('galleryImages' as any, initialData.galleryImages as GalleryItem[])
      }

      methods.setValue('galleryImageIds', initialData.galleryImages?.map(img => img.id) || [])

      methods.setValue('categoryIds', initialData.categoryIds || [])
      methods.setValue('attributeIds', initialData.attributeIds || [])
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [id, initialData, methods, router])

  const { isLoading: submitLoading, onSubmit: submitForm } = useFormSubmit<ProductFormType & { id?: string }>({
    createApi: async (formData: ProductFormType) => {
      const response = await createProduct(formData as unknown as Product)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },
    updateApi: async (productId: string, formData: Partial<ProductFormType>) => {
      if (!id) throw new Error('Product ID is required for update')

      return updateProduct(Number(productId), formData as unknown as Partial<Product>)
    },

    errorMessages: errorProductMessage,
    queryKey: QueryKeys.Products,
    successMessage: isUpdate ? 'محصول با موفقیت به‌روزرسانی شد' : 'محصول با موفقیت ایجاد شد',
    initialData: initialProduct
      ? {
          ...initialProduct,
          id: String(initialProduct.id),
          type: initialProduct.type || ProductType.SIMPLE,
          galleryImageIds: initialProduct.galleryImages?.map(img => img.id) || [],
          categoryIds: initialProduct.categories?.map(category => category.id) || [],
          attributeIds: initialProduct.attributes?.map(attribute => attribute.id) || []
        }
      : id
        ? { id: String(id) }
        : undefined,
    isUpdate
  })

  const handleSeo = useCallback(async (productId: number, data: Partial<ProductFormType>) => {
    const seoResponse = await handleSeoSave('product', productId, data)

    if (seoResponse.status !== 200 && seoResponse.status !== 201) {
      showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

      return false
    }

    return true
  }, [])

  const handleButtonClick = useCallback(
    async (type: 'cancel' | 'draft' | 'publish') => {
      if (type === 'cancel') {
        router.push('/products')

        return
      }

      await methods
        .handleSubmit(async (data: ProductFormType) => {
          setIsLoading(true)
          const status = type === 'publish' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT

          const cleanedData = cleanObject({
            ...data,
            status,
            galleryImageIds: data.galleryImageIds ?? [],
            categoryIds: data.categoryIds ?? [],
            attributeIds: data.attributeIds ?? []
          })

          const response = await submitForm(cleanedData, () => router.refresh())

          const productId = isUpdate ? id! : response?.data?.id

          if (productId) {
            await handleSeo(Number(productId), cleanedData)
          } else {
            showToast({ type: 'error', message: 'خطا در دریافت آیدی محصول' })
          }
        })()
        .finally(() => setIsLoading(false))
    },
    [methods, submitForm, id, isUpdate, router, handleSeo]
  )

  return {
    isLoading: isLoading || submitLoading,
    handleButtonClick,
    isUpdate
  }
}

// const handleProductVariants = useCallback(async (productId: number, data: Partial<ProductFormType>) => {
//   if (data?.attributeValuesIds?.length) {
//     data.attributeValuesIds.forEach(async value => {
//       console.log(value)

//       if (value) {
//         await createProductVariants({
//           productId,
//           attributeValueIds: value.filter((id): id is number => id !== undefined),
//           sku: generateRandomSKU(6)
//         })
//       }
//     })

//     return true
//   }
// }, [])

// await handleProductVariants(Number(productId), cleanedData)
