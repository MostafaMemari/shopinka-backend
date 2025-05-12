'use client'

import { Button } from '@mui/material'
import { CategoryOutlined } from '@mui/icons-material'
import EmptyState from './EmptyState'

interface ErrorStateProps {
  onRetry: () => void
}

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <EmptyState
      title='خطا در بارگذاری اطلاعات'
      subtitle='مشکلی در دریافت داده‌ها رخ داده است. لطفاً دوباره تلاش کنید.'
      icon={<CategoryOutlined color='error' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <Button variant='contained' onClick={onRetry}>
        تلاش دوباره
      </Button>
    </EmptyState>
  )
}

export default ErrorState
