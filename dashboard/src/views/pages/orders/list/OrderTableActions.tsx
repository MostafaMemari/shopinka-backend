import { Box, IconButton, CircularProgress, Tooltip } from '@mui/material'
import ShippingInfoModal from './ShippingInfoModal'
import { ShippingInfo } from '@/types/app/shippingInfo.type'

interface OrderTableActionsProps {
  orderId: number
  shippingInfo: ShippingInfo
  isLoading: boolean
  onStatusChange: (id: number, status: 'CANCELLED' | 'DELIVERED') => void
}

const OrderTableActions = ({ orderId, shippingInfo, isLoading, onStatusChange }: OrderTableActionsProps) => {
  return (
    <Box display='flex' alignItems='center' gap={2}>
      <ShippingInfoModal id={orderId} shippingInfo={shippingInfo as ShippingInfo}>
        <Tooltip title='ارسال اطلاعات حمل و نقل'>
          <IconButton size='small'>
            <i className='tabler-truck-delivery text-gray-500 text-lg' />
          </IconButton>
        </Tooltip>
      </ShippingInfoModal>

      <Tooltip title='لغو سفارش'>
        <IconButton size='small' onClick={() => onStatusChange(orderId, 'CANCELLED')} disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} /> : <i className='tabler-circle-x text-gray-500 text-lg' />}
        </IconButton>
      </Tooltip>

      <Tooltip title='تحویل داده شد'>
        <IconButton size='small' onClick={() => onStatusChange(orderId, 'DELIVERED')} disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} /> : <i className='tabler-circle-check text-gray-500 text-lg' />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default OrderTableActions
