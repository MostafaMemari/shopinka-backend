import { RobotsTag } from '@/types/enums/robotsTag'
import { saveSeoMeta } from './seo.api'
import { Seo } from '@/types/app/seo'
import { cleanObject } from '@/utils/getChangedFields'

interface SeoFormInput {
  seo_title?: string | null
  seo_description?: string | null
  seo_keywords?: string[] | null
  seo_canonicalUrl?: string | null
  seo_ogTitle?: string | null
  seo_ogDescription?: string | null
  seo_ogImage?: number | null
  seo_robotsTag?: RobotsTag | null
}

export const handleSeoSave = async (type: 'product' | 'blog' | 'tag' | 'category', entityId: number, data: SeoFormInput) => {
  const seoPayload: Omit<Seo, 'productId' | 'blogId' | 'tagId' | 'categoryId'> = {
    title: data.seo_title ?? null,
    description: data.seo_description ?? null,
    keywords: data.seo_keywords ?? null,
    canonicalUrl: data.seo_canonicalUrl ?? null,
    ogTitle: data.seo_ogTitle ?? null,
    ogDescription: data.seo_ogDescription ?? null,
    ogImage: data.seo_ogImage ?? null,
    robotsTag: data.seo_robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const cleanedSeoPayload = cleanObject(seoPayload)

  const response = await saveSeoMeta(type, entityId, cleanedSeoPayload)

  return response
}
