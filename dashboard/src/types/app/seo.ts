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
