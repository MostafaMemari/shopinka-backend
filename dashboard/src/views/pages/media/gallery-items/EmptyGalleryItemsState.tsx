'use client'

import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyGalleryItemsStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyGalleryItemsState = ({ isSearch = false, searchQuery = '' }: EmptyGalleryItemsStateProps) => {
  const title = isSearch ? `رسانه‌ای برای "${searchQuery}" یافت نشد` : 'هیچ رسانه‌ای یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا گالری جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هیچ رسانه‌ای آپلود نشده. می‌تونید رسانه‌های جدید آپلود کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyGalleryItemsState
