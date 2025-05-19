'use client'

import { Category } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyCategoryStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyCategoryState = ({ isSearch = false, searchQuery = '' }: EmptyCategoryStateProps) => {
  const title = isSearch ? `دسته‌بندی برای "${searchQuery}" یافت نشد` : 'هیچ دسته‌بندی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا محصول جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ دسته‌بندی ثبت نشده. می‌تونید محصول جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Category color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyCategoryState
