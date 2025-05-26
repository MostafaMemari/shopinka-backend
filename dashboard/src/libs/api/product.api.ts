import { Product, ProductForm } from '@/types/app/product.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { generateProductSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'

import { SeoMetaTargetType, type SeoForm } from '@/types/app/seo.type'

export const getProducts = async (params?: Record<string, string>): Promise<Response<Product[]>> => {
  const res = await serverApiFetch('/product/admin', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getProductById = async (id: number): Promise<{ status: number; data: Product | null }> => {
  const res = await serverApiFetch(`/product/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

export const defaultVariantProduct = async (id: number, variantId: number | null): Promise<{ status: number; data: Product | null }> => {
  const res = await serverApiFetch(`/product/${id}/default-variant`, {
    method: 'PATCH',
    body: { variantId }
  })

  return {
    ...res
  }
}

export const updateProduct = async (id: number, data: Partial<ProductForm>): Promise<{ status: number; data: Product | null }> => {
  const res = await serverApiFetch(`/product/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  if (id) {
    await handleSeo(Number(id), data, true)
  } else {
    showToast({ type: 'error', message: 'خطا در دریافت آیدی محصول' })
  }

  return {
    ...res
  }
}

export const createProduct = async (data: ProductForm): Promise<{ status: number; data: { product: (Product & { id: number }) | null } }> => {
  const res = await serverApiFetch('/product', {
    method: 'POST',
    body: { ...data }
  })

  if (res.status === 200 || res.status === 201) {
    await handleSeo(res.data.product.id, data)
  }

  return {
    ...res,
    status: 201
  }
}

export const removeProduct = async (id: string): Promise<{ status: number; data: { message: string; product: Product } | null }> => {
  const res = await serverApiFetch(`/product/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

const handleSeo = async (productId: number, data: Partial<ProductForm>, isUpdate?: boolean) => {
  const seoData = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle,
        seo_ogDescription: data.seo_ogDescription,
        seo_ogImage: (data as any).seo_ogImage,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.name,
        seo_description:
          data.seo_description ||
          generateProductSeoDescription({
            title: data.name,
            description: data.shortDescription ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl || data.slug,
        seo_ogTitle: data.seo_ogTitle || data.name,
        seo_ogDescription:
          data.seo_ogDescription ||
          generateProductSeoDescription({
            title: data.name,
            description: data.shortDescription ?? ''
          }),
        seo_ogImage: (data as any).seo_ogImage || data.mainImageId,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.product, productId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}
