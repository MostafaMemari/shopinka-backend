'use client'

import { Box } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import { Order } from '@/types/app/order.type'
import OrderTableRow from './OrderTableRow'

interface DesktopOrderTableProps {
  orders: Order[]
  refetch: () => void
}

const DesktopOrderTable = ({ orders, refetch }: DesktopOrderTableProps) => {
  return (
    <Box className='overflow-x-auto'>
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
              <td colSpan={7} className='text-center'>
                هیچ محصولی یافت نشد
              </td>
            </tr>
          ) : (
            orders.map(order => <OrderTableRow key={order.id} order={order} refetch={refetch} />)
          )}
        </tbody>
      </table>
    </Box>
  )
}

export default DesktopOrderTable
