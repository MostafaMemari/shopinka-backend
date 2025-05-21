import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'
import { generateTagSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Tag, TagForm } from '@/types/app/tag.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'

export const getTags = async (params?: Record<string, string>): Promise<Response<Tag[]>> => {
  const res = await serverApiFetch('/tag', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const updateTag = async (id: string, data: Partial<TagForm>): Promise<{ status: number; data: Tag | null }> => {
  const res = await serverApiFetch(`/tag/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  if (id) {
    await handleSeo(Number(id), data, true)
  } else {
    showToast({ type: 'error', message: 'خطا در دریافت آیدی برچسب' })
  }

  return {
    ...res
  }
}

export const createTag = async (data: TagForm): Promise<{ status: number; data: Tag | null }> => {
  const res = await serverApiFetch('/tag', {
    method: 'POST',
    body: { ...data }
  })

  if (res.status === 200 || res.status === 201) {
    await handleSeo(res.data.tag.id, data)
  }

  return {
    ...res,
    status: 201
  }
}

export const removeTag = async (id: string): Promise<{ status: number; data: { message: string; tag: TagForm } | null }> => {
  const res = await serverApiFetch(`/tag/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

const handleSeo = async (tagId: number, data: Partial<TagForm>, isUpdate?: boolean) => {
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
          generateTagSeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle || data.name,
        seo_ogDescription:
          data.seo_ogDescription ||
          generateTagSeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_ogImage: data.seo_ogImage || data.thumbnailImageId,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.tag, tagId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}
