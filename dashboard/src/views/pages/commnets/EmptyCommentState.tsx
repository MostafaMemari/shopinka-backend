'use client'

import { Comment } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyCommentStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyCommentState = ({ isSearch = false, searchQuery = '' }: EmptyCommentStateProps) => {
  const title = isSearch ? `نظری برای "${searchQuery}" یافت نشد` : 'هیچ نظری ثبت نشده است'

  const subtitle = isSearch ? 'جستجو نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا نظرات جدید را بررسی کنید.' : 'در حال حاضر هیچ نظری ثبت نشده است.'

  return <EmptyState title={title} subtitle={subtitle} icon={<Comment color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyCommentState
