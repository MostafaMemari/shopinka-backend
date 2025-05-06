export type GalleryForm = {
  title: string
  description: string | null
}

export type Gallery = {
  id: number
  title: string
  description: string | null
  userId: number
  createdAt: string
  updatedAt: string
}
