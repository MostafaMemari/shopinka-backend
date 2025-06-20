'use client'

import { Tag } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyTagStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyTagState = ({ isSearch = false, searchQuery = '' }: EmptyTagStateProps) => {
  const title = isSearch ? `تگ برای "${searchQuery}" یافت نشد` : 'هیچ تگ‌ای یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا تگ جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ تگ‌ای ثبت نشده. می‌تونید تگ جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Tag color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyTagState
