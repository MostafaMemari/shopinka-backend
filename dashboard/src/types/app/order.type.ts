import { Address } from './address.type'
import { ShippingInfo } from './shippingInfo.type'
import { Transaction } from './transaction.type'

export type Order = {
  id: number
  userId: number
  addressId: number
  shippingId: number
  orderNumber: string
  quantity: number
  totalPrice: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  createdAt: string
  updatedAt: string
  address?: Address
  transaction?: Transaction
  shippingInfo?: ShippingInfo
}
