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
import { cleanObject } from '@/utils/formatters'
import { showToast } from '@/utils/showToast'
import { type InferType } from 'yup'
import { GalleryItem } from '@/types/app/gallery.type'
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
              methods.setValue('seo_ogImage', String(product.seoMeta.ogImage))
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
      const response = await createProduct(formData as ProductFormType)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },

    updateApi: async (productId: string, formData: Partial<ProductFormType>) => {
      if (!id) throw new Error('Product ID is required for update')

      return updateProduct(Number(productId), formData as Partial<ProductFormType>)
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
          attributeIds: initialProduct.attributes?.map(attribute => attribute.id) || [],
          seo_canonicalUrl: initialProduct.seoMeta?.canonicalUrl,
          seo_description: initialProduct.seoMeta?.description,
          seo_keywords: initialProduct.seoMeta?.keywords,
          seo_ogDescription: initialProduct.seoMeta?.ogDescription,
          seo_ogTitle: initialProduct.seoMeta?.ogTitle,
          seo_robotsTag: initialProduct.seoMeta?.robotsTag,
          seo_title: initialProduct.seoMeta?.title
        }
      : id
        ? { id: String(id) }
        : undefined,
    isUpdate
  })

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

          const response = await submitForm(cleanedData, () => {})

          if (response?.status === 201) router.replace(`/products/edit?id=${response.data?.id}`)
        })()
        .finally(() => setIsLoading(false))
    },
    [methods, submitForm, router]
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
