'use client'

import { Button } from '@mui/material'
import { Inventory2 } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/states/EmptyState'

const EmptyProductState = () => {
  const router = useRouter()

  const handleAddProduct = () => {
    router.push('/products/add')
  }

  return (
    <EmptyState
      title='هیچ محصولی یافت نشد'
      subtitle='به نظر می‌رسه هنوز هیچ محصولی ثبت نشده. می‌تونید محصول جدیدی اضافه کنید!'
      icon={<Inventory2 color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={handleAddProduct}>
        ثبت محصول جدید
      </Button>
    </EmptyState>
  )
}

export default EmptyProductState
