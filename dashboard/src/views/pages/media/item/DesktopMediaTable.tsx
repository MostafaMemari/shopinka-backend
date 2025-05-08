'use client'

import React from 'react'
import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import RemoveMediaModal from './RemoveMediaModal'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { GalleryItem } from '@/types/gallery'
import UpdateGalleryItemModal from './UpdateGalleryItemModal'

const DesktopMediaTable = ({ data, paginatedData }: { data: GalleryItem[]; paginatedData: GalleryItem[] }) => {
  const getFileIcon = (mimetype: string) => {
    switch (mimetype) {
      case 'image/jpeg':
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
                  {file.mimetype === 'image/jpeg' && file.fileUrl ? (
                    <Image src={file.fileUrl} alt={file.title} width={50} height={50} className='rounded-md object-cover' />
                  ) : (
                    <span className='text-2xl'>{getFileIcon(file.mimetype)}</span>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {file.title}
                  </Typography>
                </td>
                <td>
                  <Typography>{file.mimetype === 'image/jpeg' ? 'تصویر' : file.mimetype === 'video' ? 'ویدیو' : 'سند'}</Typography>
                </td>
                <td>
                  <Typography>{file.size}</Typography>
                </td>
                <td>
                  <Typography>{new Date(file.createdAt).toLocaleString('fa-IR').replace(',', ' -')}</Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveMediaModal id={file.id} name={file.title} />
                    <UpdateGalleryItemModal initialData={{ title: file.title, description: file.description }} />
                    {/* <DetailMediaModal file={file} /> */}
                    {/* {file.url && <Chip label='دانلود' color='primary' variant='outlined' component='a' href={file.url} download sx={{ direction: 'rtl', margin: '2px' }} />} */}
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
