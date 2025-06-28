'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Product, ProductForm, ProductStatus, ProductType } from '@/types/app/product.type'
import { createProduct, getProductById, getProducts, updateProduct } from '@/libs/api/product.api'
import { cleanObject } from '@/utils/formatters'
import { showToast } from '@/utils/showToast'
import { GalleryItem } from '@/types/app/gallery.type'
import { errorProductMessage } from '@/messages/product.message'
import { useFormSubmit } from '../useFormSubmit'
import { RobotsTag } from '@/types/enums/robotsTag'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from '@/libs/validators/product.schema'

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

export function useProductById({ enabled = true, productId, staleTime = 1 * 60 * 1000 }: QueryOptions & { productId: number }) {
  const fetchProduct = () => getProductById(Number(productId)).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Product, productId],
    queryFn: fetchProduct,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseProductFormProps {
  id?: number | null
  initialData?: Product
}

export const useProductForm = ({ id, initialData }: UseProductFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(!!id)
  const [initialProduct, setInitialProduct] = useState<Product | null>(null)
  const isUpdate = !!id || !!initialData

  const {
    data: response,
    isLoading: productLoading,
    isError
  } = useProductById({
    productId: id ?? 0,
    enabled: !!id && !initialData
  })

  const methods = useForm<ProductForm & { defaultVariantId: number | null }>({
    resolver: yupResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: {
      sku: '',
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      quantity: null,
      basePrice: null,
      salePrice: null,
      status: ProductStatus.DRAFT,
      type: ProductType.SIMPLE,
      mainImageId: null,
      galleryImageIds: [],
      categoryIds: [],
      attributeIds: [],
      tagIds: [],
      width: null,
      height: null,
      length: null,
      weight: null,
      defaultVariantId: null,

      seo_title: '',
      seo_description: '',
      seo_keywords: [],
      seo_canonicalUrl: '',
      seo_ogTitle: '',
      seo_ogDescription: '',
      seo_ogImage: null,
      seo_robotsTag: RobotsTag.INDEX_FOLLOW
    }
  })

  useEffect(() => {
    if (id && !initialData) {
      setIsLoading(productLoading)

      if (isError) {
        showToast({ type: 'error', message: 'خطا در بارگذاری محصول' })

        return
      }

      if (response) {
        const product = response.data

        setInitialProduct(product)

        if (product) {
          Object.entries(product).forEach(([key, value]) => {
            if (key in methods.getValues() && typeof value !== 'object') {
              methods.setValue(key as keyof ProductForm, value as string | number | string[] | number[] | null)
            }
          })

          if (product.seoMeta) {
            methods.setValue('seo_title', product?.seoMeta.title || '')
            methods.setValue('seo_description', product?.seoMeta.description || '')
            methods.setValue('seo_keywords', product?.seoMeta.keywords.split(',') || [])
            methods.setValue('seo_canonicalUrl', product?.seoMeta.canonicalUrl || '')
            methods.setValue('seo_ogTitle', product?.seoMeta.ogTitle || '')
            methods.setValue('seo_ogDescription', product?.seoMeta.ogDescription || '')
            methods.setValue('seo_ogImage', product?.seoMeta.ogImage || null)
            methods.setValue('seo_robotsTag', product?.seoMeta.robotsTag || '')
          }

          if (product.mainImage) {
            methods.setValue('mainImage' as any, product.mainImage)
          }

          if (product.galleryImages && Array.isArray(product.galleryImages)) {
            methods.setValue('galleryImages' as any, product.galleryImages as GalleryItem[])
          }

          methods.setValue('defaultVariantId', product.defaultVariantId || null)
          methods.setValue('galleryImageIds', product.galleryImages?.map((img: { id: number }) => img.id) || [])
          methods.setValue('categoryIds', product.categories?.map((category: { id: number }) => category.id) || [])
          methods.setValue('attributeIds', product.attributes?.map((attribute: { id: number }) => attribute.id) || [])
          methods.setValue('tagIds', product.tags?.map((tag: { id: number }) => tag.id) || [])
        }
      }
    } else if (initialData) {
      setInitialProduct(initialData)
      Object.entries(initialData).forEach(([key, value]) => {
        if (key in methods.getValues() && typeof value !== 'object') {
          methods.setValue(key as keyof ProductForm, value as string | number | string[] | number[] | null)
        }
      })

      if (initialData.mainImage) {
        methods.setValue('mainImage' as any, initialData.mainImage as GalleryItem)
      }

      if (initialData.galleryImages && Array.isArray(initialData.galleryImages)) {
        methods.setValue('galleryImages' as any, initialData.galleryImages as GalleryItem[])
      }

      methods.setValue('galleryImageIds', initialData.galleryImages?.map(img => img.id) || [])
      methods.setValue('categoryIds', initialData.categories?.map(category => category.id) || [])
      methods.setValue('attributeIds', initialData.attributes?.map(attribute => attribute.id) || [])
      methods.setValue('tagIds', initialData.tags?.map(tag => tag.id) || [])
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [id, initialData, methods, router, response, isError, productLoading])

  const { isLoading: submitLoading, onSubmit: submitForm } = useFormSubmit<ProductForm & { id?: string }>({
    createApi: async (formData: ProductForm) => {
      const response = await createProduct(formData as ProductForm)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },

    updateApi: async (productId: string, formData: Partial<ProductForm>) => {
      if (!id) throw new Error('Product ID is required for update')

      return updateProduct(Number(productId), formData as Partial<ProductForm>)
    },

    errorMessages: errorProductMessage,
    queryKey: [QueryKeys.Products, QueryKeys.Product],
    successMessage: isUpdate ? 'محصول با موفقیت به‌روزرسانی شد' : 'محصول با موفقیت ایجاد شد',
    initialData: initialProduct
      ? ({
          ...initialProduct,
          id: String(initialProduct.id),
          type: initialProduct.type || ProductType.SIMPLE,
          galleryImageIds: initialProduct.galleryImages?.map(img => img.id) || [],
          categoryIds: initialProduct.categories?.map(category => category.id) || [],
          attributeIds: initialProduct.attributes?.map(attribute => attribute.id) || [],
          tagIds: initialProduct.tags?.map(tag => tag.id) || [],
          seo_canonicalUrl: initialProduct.seoMeta?.canonicalUrl,
          seo_description: initialProduct.seoMeta?.description,
          seo_keywords: initialProduct.seoMeta?.keywords,
          seo_ogDescription: initialProduct.seoMeta?.ogDescription,
          seo_ogTitle: initialProduct.seoMeta?.ogTitle,
          seo_ogImage: initialProduct.seoMeta?.ogImage,
          seo_robotsTag: initialProduct.seoMeta?.robotsTag,
          seo_title: initialProduct.seoMeta?.title
        } as any)
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
        .handleSubmit(async (data: ProductForm) => {
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
    isUpdate,
    methods
  }
}
