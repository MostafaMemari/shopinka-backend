import { type InferType } from 'yup'
import { Category } from './category.type'
import { GalleryItem } from './gallery.type'
import { Seo } from './seo.type'
import { blogFormSchema } from '@/libs/validators/blog.schema'
import { Tag } from './tag.type'

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
  tags: Tag[] | undefined
}

export type BlogForm = InferType<typeof blogFormSchema>
