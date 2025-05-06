'use client'

import React from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material'
import { Info } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import CustomDialog from '@/@core/components/mui/CustomDialog'

interface Media {
  id: number
  name: string
  type: 'image' | 'video' | 'document'
  size: string
  uploadedAt: string
  url?: string
}

const DetailMediaModal = ({ file }: { file: Media }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant='outlined' color='info' onClick={handleOpen} startIcon={<Info />}>
        جزئیات
      </Button>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='جزئیات فایل'
        defaultMaxWidth='sm'
        actions={
          <Button onClick={handleClose} color='secondary'>
            انصراف
          </Button>
        }
      >
        <DialogContent>
          {file.type === 'image' && file.url && (
            <Box
              mb={3}
              sx={{
                position: 'relative',
                width: '100%',
                height: '200px',
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <Image src={file.url} alt={file.name} fill style={{ objectFit: 'cover' }} className='rounded-md' />
            </Box>
          )}
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
              padding: 2,
              mt: 2
            }}
          >
            <DetailRow label='نام فایل:' value={file.name} />
            <DetailRow label='نوع:' value={file.type === 'image' ? 'تصویر' : file.type === 'video' ? 'ویدیو' : 'سند'} />
            <DetailRow label='حجم:' value={file.size} />
            <DetailRow label='تاریخ آپلود:' value={file.uploadedAt} />
          </Box>
        </DialogContent>
      </CustomDialog>
    </>
  )
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
    <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{label}</Typography>
    <Typography sx={{ wordBreak: 'break-word' }}>{value}</Typography>
  </Box>
)

export default DetailMediaModal
