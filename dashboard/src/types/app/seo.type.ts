import { seoSchema } from '@/libs/validators/seo.schema'
import { RobotsTag } from '../enums/robotsTag'
import * as yup from 'yup'

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

export type SeoForm = yup.InferType<typeof seoSchema>

export enum SeoMetaTargetType {
  product = 'product',
  blog = 'blog',
  category = 'category',
  tag = 'tag'
}

export type SeoMetaForm = {
  entityType: SeoMetaTargetType
  productId: number | null
  blogId: number | null
  categoryId: number | null
  tagUd: number | null

  title: string | null
  description: string | null
  keywords: string[] | null
  canonicalUrl: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: number | null
  robotsTag: RobotsTag | RobotsTag.INDEX_FOLLOW
}
