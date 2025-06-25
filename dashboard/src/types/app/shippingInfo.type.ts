import * as yup from 'yup'
import { shippingInfoSchema } from '@/libs/validators/shippingInfo.schema'

export type ShippingInfo = {
  id: number
  orderId: number
  trackingCode: string
  sentAt: Date
  createdAt: string
  updatedAt: string
}

export type ShippingInfoForm = yup.InferType<typeof shippingInfoSchema>
