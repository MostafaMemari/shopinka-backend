'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { toggleCommentStatus } from '@/libs/api/comment.api'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { QueryKeys } from '@/types/enums/query-keys'

interface CommentStatusToggleProps {
  id: number
  isActive: boolean
}

const CommentStatusToggle = ({ id, isActive }: CommentStatusToggleProps) => {
  const { isLoading, onSubmit } = useFormSubmit<{ isActive: boolean }>({
    updateApi: async () => {
      return toggleCommentStatus(id.toString())
    },
    errorMessages: {
      400: 'درخواست نامعتبر است',
      404: 'نظر پیدا نشد',
      500: 'خطای سرور'
    },
    queryKey: QueryKeys.Comments,
    successMessage: 'وضعیت نظر با موفقیت تغییر کرد',
    isUpdate: true,
    initialData: { id: String(id), isActive },
    noChangeMessage: 'وضعیتی تغییر نکرد'
  })

  const handleToggle = () => {
    onSubmit({ isActive: !isActive }, () => {})
  }

  return (
    <Tooltip title={isActive ? 'لغو تأیید نظر' : 'تأیید نظر'}>
      <FormControlLabel control={<Switch size='small' checked={isActive} onChange={handleToggle} disabled={isLoading} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default CommentStatusToggle
