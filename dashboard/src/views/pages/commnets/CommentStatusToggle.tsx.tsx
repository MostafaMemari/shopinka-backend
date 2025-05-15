'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { showToast } from '@/utils/showToast'
import { toggleCommentStatus } from '@/libs/api/comment.api'

interface CommentStatusToggleProps {
  id: number
  isActive: boolean
}

const CommentStatusToggle = ({ id, isActive }: CommentStatusToggleProps) => {
  const handleConfirmComment = async () => {
    try {
      const res = await toggleCommentStatus(id.toString())

      if (res?.status === 200) {
        showToast({
          type: 'success',
          message: 'وضعیت نظر با موفقیت تغییر کرد'
        })
      } else {
        showToast({ type: 'error', message: 'خطا در تغییر وضعیت نظر' })
      }
    } catch (error) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  return (
    <Tooltip title={isActive ? 'لغو تأیید نظر' : 'تأیید نظر'}>
      <FormControlLabel control={<Switch size='small' checked={isActive} onChange={handleConfirmComment} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default CommentStatusToggle
