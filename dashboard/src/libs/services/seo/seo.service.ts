import { saveSeoMeta } from './seo.api'

export const handleSeoSave = async (type: 'product' | 'blog' | 'tag' | 'category', entityId: number, data: any) => {
  const response = await saveSeoMeta(type, entityId, {
    title: data.seo_title || data.name,
    description: data.seo_description || data.shortDescription,
    keywords: data.seo_keywords,
    canonicalUrl: data.seo_canonicalUrl,
    ogTitle: data.seo_ogTitle || data.name,
    ogDescription: data.seo_ogDescription || data.shortDescription,
    ogImage: data.seo_ogImage,
    robotsTag: data.seo_robotsTag || 'index, follow'
  })

  return response
}
