'use client'

import { Button } from '@mui/material'
import { CategoryOutlined } from '@mui/icons-material'
import EmptyState from './EmptyState'

interface Props {
  onRetry?: () => void
  title?: string
  subtitle?: string
}

const GenericErrorState = ({ onRetry, title = 'خطا در بارگذاری داده‌ها', subtitle = 'مشکلی در دریافت اطلاعات رخ داده است. لطفاً دوباره تلاش کنید.' }: Props) => {
  return (
    <EmptyState title={title} subtitle={subtitle} icon={<CategoryOutlined color='error' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}>
      {onRetry && (
        <Button variant='contained' onClick={onRetry}>
          تلاش دوباره
        </Button>
      )}
    </EmptyState>
  )
}

export default GenericErrorState
