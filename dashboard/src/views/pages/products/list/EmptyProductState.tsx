'use client'

import { Inventory2 } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyProductStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyProductState = ({ isSearch = false, searchQuery = '' }: EmptyProductStateProps) => {
  const title = isSearch ? `محصولی برای "${searchQuery}" یافت نشد` : 'هیچ محصولی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا محصول جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ محصولی ثبت نشده. می‌تونید محصول جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Inventory2 color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyProductState
