'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, IconButton, Chip } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Type Imports
import { Shipping } from '@/types/app/shipping.type'
import Link from 'next/link'

// Component Imports
import UpdateShippingModal from './UpdateShippingModal'
import RemoveShippingModal from './RemoveShippingModal'

export type ShippingForm = {
  id?: string
  name: string
  price: number | null
  estimatedDays: number | null
  isActive: boolean
}

const DesktopShippingTable = ({ data }: { data: Shipping[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>نام روش حمل</th>
            <th>هزینه (تومان)</th>
            <th>مدت زمان تخمینی (روز)</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.name}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.price ? row.price.toLocaleString('fa-IR') : '-'}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.estimatedDays ? row.estimatedDays : '-'}
                </Typography>
              </td>
              <td>
                <Chip label={row.isActive ? 'فعال' : 'غیرفعال'} color={row.isActive ? 'success' : 'warning'} size='small' />
              </td>
              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <RemoveShippingModal id={String(row.id)} />
                  <UpdateShippingModal initialData={row} />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopShippingTable
