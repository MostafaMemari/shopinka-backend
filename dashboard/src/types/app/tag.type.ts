export type Tag = {
  id: number
  name: string
  slug: string
  description: string | null
  userId: number
  thumbnailImageId: number | null
  createdAt: string
  updatedAt: string
  thumbnailImage: {
    fileUrl: string
    thumbnailUrl: string
  }
}

export type TagForm = {
  name: string
  slug: string
  description: string | null
  thumbnailImageId: number | null
}
