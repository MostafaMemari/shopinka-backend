'use client'

import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { Title, Description, Person, Star, CalendarToday, Inventory, Info } from '@mui/icons-material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Comment } from '@/types/app/comment.type'
import { formatDate, stripHtml } from '@/utils/formatters'
import { useState } from 'react'

interface CommentDetailsModalProps {
  comment: Comment | null
}

const CommentDetailsModal = ({ comment }: CommentDetailsModalProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const DetailRow = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        padding: '8px 0',
        borderBottom: '1px solid #e8ecef',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      {icon}
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', minWidth: '100px' }}>{label}:</Typography>
      <Typography sx={{ wordBreak: 'break-word', color: 'text.primary' }}>{value}</Typography>
    </Box>
  )

  return (
    <>
      <Tooltip title='مشاهده کامل'>
        <IconButton size='small' onClick={handleOpen}>
          <i className='tabler-eye text-gray-500 text-lg' />
        </IconButton>
      </Tooltip>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='جزئیات نظر'
        defaultMaxWidth='sm'
        actions={
          <Button onClick={handleClose} color='secondary' variant='outlined'>
            بستن
          </Button>
        }
      >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            borderRadius: 2,
            padding: 3,
            border: '1px solid #e0e4e8'
          }}
        >
          <DetailRow label='عنوان' value={comment?.title || '-'} icon={<Title color='primary' fontSize='small' />} />
          <DetailRow label='محصول' value={comment?.product?.name || '-'} icon={<Inventory color='primary' fontSize='small' />} />
          <DetailRow label='کاربر' value={comment?.user?.fullName || comment?.user?.mobile || '-'} icon={<Person color='primary' fontSize='small' />} />
          <DetailRow label='امتیاز' value={comment?.rate?.toString() || '-'} icon={<Star color='primary' fontSize='small' />} />
          <DetailRow label='محتوا' value={stripHtml(comment?.content || '-')} icon={<Description color='primary' fontSize='small' />} />
          <DetailRow label='تاریخ ایجاد' value={formatDate(comment?.createdAt || '')} icon={<CalendarToday color='primary' fontSize='small' />} />{' '}
        </Box>
      </CustomDialog>
    </>
  )
}

export default CommentDetailsModal
