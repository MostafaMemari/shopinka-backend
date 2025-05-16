'use client'

import { Button } from '@mui/material'
import { Tag } from '@mui/icons-material'
import CreateCategoryModal from './CreateTagModal'
import EmptyState from '@/components/states/EmptyState'

const EmptyCategoryState = () => {
  return (
    <EmptyState
      title='هیچ برچسبی یافت نشد'
      subtitle='به نظر می‌رسه هیچ برچسبی در این بخش وجود نداره. می‌تونید برچسبی جدید ایجاد کنید!'
      icon={<Tag color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateCategoryModal>
        <Button variant='contained' startIcon={<i className='tabler-plus' />}>
          ثبت برچسب جدید
        </Button>
      </CreateCategoryModal>
    </EmptyState>
  )
}

export default EmptyCategoryState
