'use client'

import React from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import RemoveMediaModal from './RemoveMediaModal'
import DetailMediaModal from './DetailMediaModal'

interface Media {
  id: number
  name: string
  type: 'image' | 'video' | 'document'
  size: string
  uploadedAt: string
  url?: string
}

const MobileMediaCard = ({ data, paginatedData }: { data: Media[]; paginatedData: Media[] }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return '🖼️'
      case 'video':
        return '🎥'
      case 'document':
        return '📄'
      default:
        return '📁'
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      {paginatedData.length === 0 ? (
        <Typography className='text-center p-8 text-gray-500 dark:text-gray-400'>داده‌ای موجود نیست</Typography>
      ) : (
        paginatedData.map(file => (
          <Card
            key={file.id}
            sx={{
              mb: 4,
              bgcolor: 'background.paper',
              borderColor: 'divider',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
            className='dark:bg-gray-800'
          >
            <CardContent>
              <Box display='flex' alignItems='center' gap={2} mb={2}>
                {file.type === 'image' && file.url ? (
                  <Image src={file.url} alt={file.name} width={50} height={50} className='rounded-md object-cover' />
                ) : (
                  <span className='text-2xl'>{getFileIcon(file.type)}</span>
                )}
                <Typography variant='h6' className='font-medium text-gray-900 dark:text-white'>
                  {file.name}
                </Typography>
              </Box>
              <Typography className='text-gray-700 dark:text-gray-300'>نوع: {file.type === 'image' ? 'تصویر' : file.type === 'video' ? 'ویدیو' : 'سند'}</Typography>
              <Typography className='text-gray-700 dark:text-gray-300'>حجم: {file.size}</Typography>
              <Typography className='text-gray-700 dark:text-gray-300'>تاریخ آپلود: {file.uploadedAt}</Typography>
              <Box display='flex' gap={2} mt={2}>
                <RemoveMediaModal id={file.id} name={file.name} />
                <DetailMediaModal file={file} />
                {file.url && <Chip label='دانلود' color='primary' variant='outlined' component='a' href={file.url} download sx={{ direction: 'rtl' }} />}
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  )
}

export default MobileMediaCard
