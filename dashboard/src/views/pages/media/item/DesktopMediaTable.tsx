'use client'

import React from 'react'
import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import DetailMediaModal from './DetailMediaModal'
import RemoveMediaModal from './RemoveMediaModal'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

interface Media {
  id: number
  name: string
  type: 'image' | 'video' | 'document'
  size: string
  uploadedAt: string
  url?: string
}

const DesktopMediaTable = ({ data, paginatedData }: { data: Media[]; paginatedData: Media[] }) => {
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
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>پیش‌نمایش</th>
            <th>نام فایل</th>
            <th>نوع</th>
            <th>حجم</th>
            <th>تاریخ آپلود</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={6} className='text-center p-8 text-gray-500 dark:text-gray-400'>
                داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            paginatedData.map(file => (
              <tr key={file.id}>
                <td>
                  {file.type === 'image' && file.url ? (
                    <Image src={file.url} alt={file.name} width={50} height={50} className='rounded-md object-cover' />
                  ) : (
                    <span className='text-2xl'>{getFileIcon(file.type)}</span>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {file.name}
                  </Typography>
                </td>
                <td>
                  <Typography>{file.type === 'image' ? 'تصویر' : file.type === 'video' ? 'ویدیو' : 'سند'}</Typography>
                </td>
                <td>
                  <Typography>{file.size}</Typography>
                </td>
                <td>
                  <Typography>{file.uploadedAt}</Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveMediaModal id={file.id} name={file.name} />
                    <DetailMediaModal file={file} />
                    {file.url && <Chip label='دانلود' color='primary' variant='outlined' component='a' href={file.url} download sx={{ direction: 'rtl', margin: '2px' }} />}
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopMediaTable
