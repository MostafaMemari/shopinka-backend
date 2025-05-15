import { Product } from './product.type'
import { User } from './user.type'

export type Comment = {
  id: number
  title: string
  content: string
  isActive: boolean
  isRecommended: boolean
  rate: number
  userId: number
  productId: number
  blogId: number | null
  parentId: number | null
  createdAt: string
  updatedAt: string

  product: Product
  user: User
}

export type CommentForm = {
  title: string
  content: string
  isRecommended: boolean
  rate: number
  userId: number
  productId: number
}
