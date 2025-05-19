'use client'

import { Article } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyBlogStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyBlogState = ({ isSearch = false, searchQuery = '' }: EmptyBlogStateProps) => {
  const title = isSearch ? `بلاگی برای "${searchQuery}" یافت نشد` : 'هیچ بلاگی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا بلاگ جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ بلاگی ثبت نشده. می‌تونید بلاگ جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Article color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyBlogState
