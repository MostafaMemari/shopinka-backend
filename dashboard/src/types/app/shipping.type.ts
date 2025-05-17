import { User } from './user.type'

export type Shipping = {
  id: number
  userId: number
  name: string
  price: number
  estimatedDays: number | null
  isActive: true
  createdAt: string
  updatedAt: string
  user: User
}

export type ShippingForm = {
  name: string
  price: number | null
  estimatedDays: number | null
  isActive: boolean
}
