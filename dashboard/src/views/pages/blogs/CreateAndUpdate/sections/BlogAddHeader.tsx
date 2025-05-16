'use client'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface BlogAddHeaderProps {
  onButtonClick: (buttonType: 'cancel' | 'draft' | 'publish') => void
  isLoading: boolean
  isUpdate: boolean
}

const BlogAddHeader: FC<BlogAddHeaderProps> = ({ onButtonClick, isLoading, isUpdate }) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {isUpdate ? 'ویرایش بلاگ' : 'افزودن بلاگ جدید'}
        </Typography>
        <Typography>مدیریت بلاگ‌های وب‌سایت شما</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' type='button' onClick={() => onButtonClick('cancel')} disabled={isLoading}>
          لغو
        </Button>
        {!isUpdate && (
          <Button variant='tonal' type='button' onClick={() => onButtonClick('draft')} disabled={isLoading}>
            ذخیره پیش‌نویس
          </Button>
        )}
        <Button variant='contained' color='primary' type='button' onClick={() => onButtonClick('publish')} disabled={isLoading}>
          {isLoading ? 'در حال ارسال...' : isUpdate ? 'به‌روزرسانی بلاگ' : 'انتشار بلاگ'}
        </Button>
      </div>
    </div>
  )
}

export default BlogAddHeader
