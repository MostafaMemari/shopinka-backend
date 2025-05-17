'use client'

import { LocalShipping } from '@mui/icons-material'
import CreateShippingModal from './CreateShippingModal'
import EmptyState from '@/components/states/EmptyState'

const EmptyShippingState = () => {
  return (
    <EmptyState
      title='هیچ روش حمل و نقلی یافت نشد'
      subtitle='به نظر می‌رسه هیچ روش حمل و نقلی در این بخش وجود نداره. می‌تونید روش جدید اضافه کنید!'
      icon={<LocalShipping color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateShippingModal />
    </EmptyState>
  )
}

export default EmptyShippingState
