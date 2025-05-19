'use client'

import { LocalShipping } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyShippingStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyShippingState = ({ isSearch = false, searchQuery = '' }: EmptyShippingStateProps) => {
  const title = isSearch ? `روش حمل برای "${searchQuery}" یافت نشد` : 'هیچ روش حملی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا روش حمل جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ روش حملی ثبت نشده. می‌تونید روش حمل جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<LocalShipping color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyShippingState
