'use client'

import { Tag } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyPageStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyPageState = ({ isSearch = false, searchQuery = '' }: EmptyPageStateProps) => {
  const title = isSearch ? `برگه برای "${searchQuery}" یافت نشد` : 'هیچ برگه‌ای یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا برگه جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ برگه ثبت نشده. می‌تونید برگه جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Tag color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyPageState
