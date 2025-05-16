'use client'

import { Button } from '@mui/material'
import { Article } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/states/EmptyState'

const EmptyBlogState = () => {
  const router = useRouter()

  const handleAddBlog = () => {
    router.push('/blogs/add')
  }

  return (
    <EmptyState
      title='هیچ بلاگی یافت نشد'
      subtitle='به نظر می‌رسه هنوز هیچ بلاگی ثبت نشده. می‌تونید بلاگ جدیدی بنویسید!'
      icon={<Article color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={handleAddBlog}>
        نوشتن بلاگ جدید
      </Button>
    </EmptyState>
  )
}

export default EmptyBlogState
