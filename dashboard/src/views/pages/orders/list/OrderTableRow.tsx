import { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { Order } from '@/types/app/order.type'
import { changeStatusOrder } from '@/libs/api/order.api'
import OrderTableActions from './OrderTableActions'
import { ShippingInfo } from '@/types/app/shippingInfo.type'

const TRANSACTION_STATUS_MAP = {
  SUCCESS: { label: 'موفق', color: 'success' },
  FAILED: { label: 'ناموفق', color: 'error' },
  PENDING: { label: 'در انتظار', color: 'info' },
  REFUNDED: { label: 'برگشت داده', color: 'warning' },
  UNKNOWN: { label: 'نامشخص', color: 'info' }
} as const

const ORDER_STATUS_MAP = {
  CANCELLED: { label: 'لغو شده', color: 'error' },
  DELIVERED: { label: 'تحویل شده', color: 'success' },
  PENDING: { label: 'در انتظار', color: 'warning' },
  PROCESSING: { label: 'درحال پردازش', color: 'secondary' },
  SHIPPED: { label: 'تحویل پست', color: 'info' },
  UNKNOWN: { label: 'نامشخص', color: 'info' }
} as const

interface OrderTableRowProps {
  order: Order
  refetch: () => void
}

const OrderTableRow = ({ order, refetch }: OrderTableRowProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (id: number, status: 'CANCELLED' | 'DELIVERED') => {
    setIsLoading(true)

    try {
      const res = await changeStatusOrder(id, status)

      if (res.status === 200) refetch()
    } finally {
      setIsLoading(false)
    }
  }

  const transactionStatus = order.transaction?.status
    ? TRANSACTION_STATUS_MAP[order.transaction.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
    : TRANSACTION_STATUS_MAP.UNKNOWN

  const orderStatus = order.status ? ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || ORDER_STATUS_MAP.UNKNOWN : ORDER_STATUS_MAP.UNKNOWN

  return (
    <tr>
      <td>{order.orderNumber}</td>
      <td>
        <Typography className='font-medium' color='text.primary'>
          {order.address?.fullName}
        </Typography>
      </td>
      <td>
        <Chip label={transactionStatus.label} color={transactionStatus.color} size='small' />
      </td>
      <td>
        <Chip label={orderStatus.label} color={orderStatus.color} size='small' />
      </td>
      <td>{order.transaction?.createdAt ? new Date(order.transaction.createdAt).toLocaleString('fa-ir') : '-'}</td>
      <td>{order.transaction?.amount ?? '-'}</td>
      <td>
        <OrderTableActions orderId={order.id} shippingInfo={order.shippingInfo as ShippingInfo} isLoading={isLoading} onStatusChange={handleStatusChange} />
      </td>
    </tr>
  )
}

export default OrderTableRow
