'use client'

import React from 'react'
import { Button, DialogContent, Typography, Box, IconButton } from '@mui/material'
import { Info, Title, Description, Image as ImageIcon, Storage, CalendarToday } from '@mui/icons-material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { GalleryItem } from '@/types/app/gallery.type'
import { formatDate, formatFileSize } from '@/utils/formatters'

const getFileType = (mimetype: string): 'image' | 'video' | 'document' => {
  if (mimetype.startsWith('image/')) return 'image'
  if (mimetype.startsWith('video/')) return 'video'

  return 'document'
}

const DetailMediaModal = ({ file }: { file: GalleryItem }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fileType = getFileType(file.mimetype)

  return (
    <div>
      <IconButton onClick={handleOpen} size='small'>
        <Info fontSize='small' />
      </IconButton>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='جزئیات فایل'
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
              border: '1px solid #e0e4e8'
            }}
          >
            <DetailRow label='عنوان' value={file.title} icon={<Title color='primary' fontSize='small' />} />
            <DetailRow label='توضیحات' value={file?.description ? file.description : '-'} icon={<Description color='primary' fontSize='small' />} />
            <DetailRow label='نوع فایل' value={fileType === 'image' ? 'تصویر' : fileType === 'video' ? 'ویدیو' : 'سند'} icon={<ImageIcon color='primary' fontSize='small' />} />
            <DetailRow label='حجم' value={formatFileSize(file.size)} icon={<Storage color='primary' fontSize='small' />} />
            <DetailRow label='تاریخ آپلود' value={formatDate(file.createdAt)} icon={<CalendarToday color='primary' fontSize='small' />} />
          </Box>
        </DialogContent>
      </CustomDialog>
    </div>
  )
}

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

export default DetailMediaModal
