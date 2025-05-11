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
  thumbnailImage: number | null
  parent: Category | null
}

export type CategoryForm = {
  name: string
  slug: string
  description: string | null
  parentId: number | null
  thumbnailImageId: number | null
}
