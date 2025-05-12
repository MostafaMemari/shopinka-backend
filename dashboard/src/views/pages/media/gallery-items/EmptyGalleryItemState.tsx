'use client'

import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'
import CreateMediaModal from './CreateMediaModal'

const EmptyGalleryItemsState = () => {
  return (
    <EmptyState
      title='هیچ رسانه‌ای یافت نشد'
      subtitle='به نظر می‌رسه هیچ رسانه‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
      icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateMediaModal />
    </EmptyState>
  )
}

export default EmptyGalleryItemsState
