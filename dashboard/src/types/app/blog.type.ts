import { Category } from './category.type'
import { GalleryItem } from './gallery.type'
import { Seo } from './seo.type'

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export type Blog = {
  id: number
  title: string
  slug: string
  content: string | null
  readingTime: number | null

  status: BlogStatus | null
  mainImageId: number | null
  categoryIds: number[] | []

  seoMeta: Seo | undefined
  mainImage: GalleryItem | undefined
  categories: Category[] | undefined
}
