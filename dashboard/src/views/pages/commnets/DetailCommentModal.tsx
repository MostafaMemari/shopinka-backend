'use client'

import React from 'react'
import { Button, DialogContent, Typography, Box, IconButton } from '@mui/material'
import { Title, Description, Person, Star, CalendarToday, Inventory } from '@mui/icons-material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Comment } from '@/types/app/comment.type'
import { stripHtml } from '@/utils/formatters'

const CommentDetailsModal = ({ comment }: { comment: Comment }) => {
  const [open, setOpen] = React.useState(false)

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
        '&:last-child': { borderBottom: 'none' },
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1
        }
      }}
    >
      {icon}
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', minWidth: '100px' }}>{label}:</Typography>
      <Typography sx={{ wordBreak: 'break-word', color: 'text.primary' }}>{value}</Typography>
    </Box>
  )

  return (
    <div>
      <IconButton onClick={handleOpen} size='small'>
        <i className='tabler-eye text-gray-500 text-lg' />
      </IconButton>

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
        <DialogContent sx={{ pb: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              borderRadius: 2,
              padding: 3,
              border: '1px solid #e0e4e8',
              maxHeight: '70vh',
              overflowY: 'auto',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '@media (max-width: 600px)': {
                padding: 2,
                gap: 1
              }
            }}
          >
            <DetailRow label='عنوان' value={comment.title || '-'} icon={<Title color='primary' fontSize='small' />} />
            <DetailRow label='محصول' value={comment.product?.name || '-'} icon={<Inventory color='primary' fontSize='small' />} />
            <DetailRow label='کاربر' value={comment.user?.fullName || comment.user?.mobile || '-'} icon={<Person color='primary' fontSize='small' />} />
            <DetailRow label='امتیاز' value={comment.rate?.toString() || '-'} icon={<Star color='primary' fontSize='small' />} />
            <DetailRow label='محتوا' value={stripHtml(comment.content || '-')} icon={<Description color='primary' fontSize='small' />} />
            <DetailRow
              label='تاریخ ایجاد'
              value={comment.createdAt ? new Date(comment.createdAt).toLocaleString('fa-IR') : '-'}
              icon={<CalendarToday color='primary' fontSize='small' />}
            />
          </Box>
        </DialogContent>
      </CustomDialog>
    </div>
  )
}

export default CommentDetailsModal
