'use client'

import { LayersOutlined } from '@mui/icons-material'
import CreateAttributeModal from './CreateAttributeModal'
import EmptyState from '@/components/states/EmptyState'

const EmptyAttributeState = () => {
  return (
    <EmptyState
      title='هیچ ویژگی یافت نشد'
      subtitle='به نظر می‌رسه هیچ ویژگی در این بخش وجود نداره. می‌تونید ویژگی جدید ایجاد کنید!'
      icon={<LayersOutlined color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    >
      <CreateAttributeModal />
    </EmptyState>
  )
}

export default EmptyAttributeState
