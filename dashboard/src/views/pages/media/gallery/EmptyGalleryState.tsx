'use client'

import { PermMedia } from '@mui/icons-material'
import CreateGalleryModal from './CreateGalleryModal'
import EmptyState from '@/components/states/EmptyState'

const EmptyGalleryState = () => {
  return (
    <EmptyState
      title='هیچ گالری‌ای یافت نشد'
      subtitle='به نظر می‌رسه هیچ گالری‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
      icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateGalleryModal />
    </EmptyState>
  )
}

export default EmptyGalleryState
