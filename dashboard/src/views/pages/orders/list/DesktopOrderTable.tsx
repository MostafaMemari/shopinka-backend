'use client'

import { Box, IconButton, Typography, Chip, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import tableStyles from '@core/styles/table.module.css'
import RemoveProductModal from './RemoveOrderModal'
import { useState } from 'react'
import { Order } from '@/types/app/order.type'
import ShippingInfoModal from './ShippingInfoModal'

const DesktopOrderTable = ({ orders }: { orders: Order[] }) => {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState<number | null>(null)

  const handleEditProduct = (id: number) => {
    setIsNavigating(id)
    router.push(`/products/edit?id=${id}`)
  }

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>نام خریدار</th>
            <th>وضعیت پرداخت</th>
            <th>وضعیت سفارش</th>
            <th>تاریخ ثبت سفارش</th>
            <th>مبلغ پرداختی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={8} className='text-center'>
                هیچ محصولی یافت نشد
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {order.address?.fullName}
                  </Typography>
                </td>
                <td>
                  <Chip
                    label={
                      order.transaction?.status === 'SUCCESS'
                        ? 'موفق'
                        : order.transaction?.status === 'FAILED'
                          ? 'ناموفق'
                          : order.transaction?.status === 'PENDING'
                            ? 'در انتظار'
                            : order.transaction?.status === 'REFUNDED'
                              ? 'برگشت داده'
                              : 'نامشخص'
                    }
                    color={
                      order.transaction?.status === 'SUCCESS'
                        ? 'success'
                        : order.transaction?.status === 'FAILED'
                          ? 'error'
                          : order.transaction?.status === 'PENDING'
                            ? 'info'
                            : order.transaction?.status === 'REFUNDED'
                              ? 'warning'
                              : 'info'
                    }
                    size='small'
                  />
                </td>
                <td>
                  <Chip
                    label={
                      order.status === 'CANCELLED'
                        ? 'لغو شده'
                        : order.status === 'DELIVERED'
                          ? 'تحویل شده'
                          : order.status === 'PENDING'
                            ? 'در انتظار'
                            : order.status === 'PROCESSING'
                              ? 'درحال پردازش'
                              : order.status === 'SHIPPED'
                                ? 'تحویل پست'
                                : 'نا مشخص'
                    }
                    color={
                      order.status === 'CANCELLED'
                        ? 'error'
                        : order.status === 'DELIVERED'
                          ? 'success'
                          : order.status === 'PENDING'
                            ? 'warning'
                            : order.status === 'PROCESSING'
                              ? 'secondary'
                              : order.status === 'SHIPPED'
                                ? 'info'
                                : 'info'
                    }
                    size='small'
                  />
                </td>
                <td>{/* {new Date(order.transaction?.createdAt).toLocaleString('fa-ir')} */}</td>
                <td>{order.transaction?.amount}</td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <ShippingInfoModal id={order.id} shippingInfo={order.shippingInfo}>
                      <IconButton size='small'>
                        <i className='tabler-car text-gray-500 text-lg' />
                      </IconButton>
                    </ShippingInfoModal>
                    <IconButton size='small' onClick={() => handleEditProduct(order.id)} disabled={isNavigating === order.id}>
                      {isNavigating === order.id ? <CircularProgress size={20} /> : <i className='tabler-edit text-gray-500 text-lg' />}
                    </IconButton>
                    <RemoveProductModal id={order.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveProductModal>
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopOrderTable
