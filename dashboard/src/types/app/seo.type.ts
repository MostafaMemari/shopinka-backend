import { RobotsTag } from '../enums/robotsTag'

export type Seo = {
  title: string | null
  description: string | null
  keywords: string[] | null
  canonicalUrl: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: number | null
  robotsTag: RobotsTag | RobotsTag.INDEX_FOLLOW
  productId: number | null
  blogId: number | null
  tagId: number | null
  categoryId: number | null
}

export interface SeoFormInput {
  seo_title?: string | null
  seo_description?: string | null
  seo_keywords?: string[] | null
  seo_canonicalUrl?: string | null
  seo_ogTitle?: string | null
  seo_ogDescription?: string | null
  seo_ogImage?: number | null
  seo_robotsTag?: RobotsTag | null
}
