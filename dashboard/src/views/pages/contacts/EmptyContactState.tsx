'use client'

import { EmailOutlined } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyContactStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyContactState = ({ isSearch = false, searchQuery = '' }: EmptyContactStateProps) => {
  const title = isSearch ? `پیامی برای "${searchQuery}" یافت نشد` : 'هیچ پیامی ثبت نشده است'

  const subtitle = isSearch ? 'جستجو نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا پیام‌های جدید را بررسی کنید.' : 'در حال حاضر هیچ پیامی ثبت نشده است.'

  return <EmptyState title={title} subtitle={subtitle} icon={<EmailOutlined color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyContactState
