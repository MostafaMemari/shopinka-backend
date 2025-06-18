export type Transaction = {
  id: number
  userId: number
  orderId: number
  amount: number
  invoiceNumber: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  authority: string
  sessionId: null
  createdAt: string
  updatedAt: string
}
