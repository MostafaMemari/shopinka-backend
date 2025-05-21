import { generateCategorySeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Category } from '@/types/app/category.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { CategoryForm } from '../validators/category.schema'
import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'

export const getCategories = async (params?: Record<string, string>): Promise<Response<Category[]>> => {
  const res = await serverApiFetch('/category', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const updateCategory = async (id: string, data: Partial<CategoryForm>): Promise<{ status: number; data: Category | null }> => {
  const res = await serverApiFetch(`/category/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  if (id) {
    await handleSeo(Number(id), data, true)
  } else {
    showToast({ type: 'error', message: 'خطا در دریافت آیدی دسته بندی' })
  }

  return {
    ...res
  }
}

export const createCategory = async (data: CategoryForm): Promise<{ status: number; data: Category | null }> => {
  const res = await serverApiFetch('/category', {
    method: 'POST',
    body: { ...data }
  })

  if (res.status === 200 || res.status === 201) {
    await handleSeo(res.data.category.id, data)
  }

  return {
    ...res,
    status: 201
  }
}

export const removeCategory = async (id: string): Promise<{ status: number; data: { message: string; category: CategoryForm } | null }> => {
  const res = await serverApiFetch(`/category/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

const handleSeo = async (categoryId: number, data: Partial<CategoryForm>, isUpdate?: boolean) => {
  const seoData = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle,
        seo_ogDescription: data.seo_ogDescription,
        seo_ogImage: data.seo_ogImage,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.name,
        seo_description:
          data.seo_description ||
          generateCategorySeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle || data.name,
        seo_ogDescription:
          data.seo_ogDescription ||
          generateCategorySeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_ogImage: data.seo_ogImage || data.thumbnailImageId,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.category, categoryId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}
