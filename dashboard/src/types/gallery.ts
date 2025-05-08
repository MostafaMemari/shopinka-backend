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

export type GalleryItemForm = {
  galleryId: string
  title: string
  description: string
  image: FormData
}

export type GalleryItem = {
  id: number
  galleryId: number
  title: string
  description: null
  fileUrl: string
  fileKey: string
  mimetype: string
  size: number
  createdAt: string
  updatedAt: string
}
