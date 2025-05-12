'use client'

import { Button } from '@mui/material'
import { CategoryOutlined } from '@mui/icons-material'
import CreateCategoryModal from './CreateCategoryModal'
import EmptyState from '@/components/states/EmptyState'

const EmptyCategoryState = () => {
  return (
    <EmptyState
      title='هیچ دسته‌بندی یافت نشد'
      subtitle='به نظر می‌رسه هیچ دسته‌بندی در این بخش وجود نداره. می‌تونید دسته‌بندی جدید ایجاد کنید!'
      icon={<CategoryOutlined color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateCategoryModal>
        <Button variant='contained' startIcon={<i className='tabler-plus' />}>
          ثبت دسته‌بندی جدید
        </Button>
      </CreateCategoryModal>
    </EmptyState>
  )
}

export default EmptyCategoryState
