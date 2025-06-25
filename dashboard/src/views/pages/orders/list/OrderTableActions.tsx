import { Box, IconButton, CircularProgress } from '@mui/material'
import ShippingInfoModal from './ShippingInfoModal'
import RemoveProductModal from './RemoveOrderModal'
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
        <IconButton size='small'>
          <i className='tabler-truck-delivery text-gray-500 text-lg' />
        </IconButton>
      </ShippingInfoModal>
      <IconButton size='small' onClick={() => onStatusChange(orderId, 'CANCELLED')} disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : <i className='tabler-circle-x text-gray-500 text-lg' />}
      </IconButton>
      <IconButton size='small' onClick={() => onStatusChange(orderId, 'DELIVERED')} disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : <i className='tabler-circle-check text-gray-500 text-lg' />}
      </IconButton>
      <RemoveProductModal id={orderId}>
        <IconButton size='small'>
          <i className='tabler-trash text-gray-500 text-lg' />
        </IconButton>
      </RemoveProductModal>
    </Box>
  )
}

export default OrderTableActions
