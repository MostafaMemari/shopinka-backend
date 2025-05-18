import { Seo } from './seo.type'

export type Category = {
  id: number
  name: string
  slug: string
  description: string | null
  parentId: number | null
  userId: number
  thumbnailImageId: number | null
  createdAt: string
  updatedAt: string
  thumbnailImage: {
    fileUrl: string
    thumbnailUrl: string
  }
  children: Category[] | []
  parent: Category | null
  seoMeta: Seo | null
}
