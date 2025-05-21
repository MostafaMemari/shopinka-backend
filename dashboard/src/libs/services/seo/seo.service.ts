import { RobotsTag } from '@/types/enums/robotsTag'
import { saveSeoMeta } from './seo.api'
import { SeoMetaTargetType, SeoForm, SeoMetaForm } from '@/types/app/seo.type'
import { cleanObject } from '@/utils/getChangedFields'

export const handleSeoSave = async (type: SeoMetaTargetType, entityId: number, data: SeoForm) => {
  const seoPayload: SeoMetaForm = {
    productId: type === 'product' ? entityId : null,
    blogId: type === 'blog' ? entityId : null,
    categoryId: type === 'category' ? entityId : null,
    tagUd: type === 'tag' ? entityId : null,
    entityType: type,
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
