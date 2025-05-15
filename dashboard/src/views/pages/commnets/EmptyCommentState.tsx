'use client'

import { ChatBubbleOutline } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

const EmptyCommentState = () => {
  return (
    <EmptyState
      title='هیچ نظری یافت نشد'
      subtitle='به نظر می‌رسه هیچ نظری در این بخش وجود نداره. می‌تونید نظر جدید ایجاد کنید!'
      icon={<ChatBubbleOutline color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
    ></EmptyState>
  )
}

export default EmptyCommentState
