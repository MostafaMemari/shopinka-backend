'use client'

import { Attractions } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyAttributeStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyAttributeState = ({ isSearch = false, searchQuery = '' }: EmptyAttributeStateProps) => {
  const title = isSearch ? `ویژگی برای "${searchQuery}" یافت نشد` : 'هیچ ویژگی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا ویژگی جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ ویژگی ثبت نشده. می‌تونید ویژگی جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Attractions color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyAttributeState
