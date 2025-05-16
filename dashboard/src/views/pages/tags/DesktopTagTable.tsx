'use client'

import { Box, IconButton, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import UpdateTagModal from './UpdateTagModal'
import RemoveTagModal from './RemoveTagModal'
import { stripHtml, truncateText } from '@/utils/formatters'
import { Tag } from '@/types/app/tag.type'

const DesktopTagTable = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام تگ</th>
            <th>نامک تگ</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {tags.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                هیچ تگی یافت نشد
              </td>
            </tr>
          ) : (
            tags.map(tag => (
              <tr key={tag.id}>
                <td>
                  {tag.thumbnailImageId && tag.thumbnailImage?.thumbnailUrl ? (
                    <img src={tag.thumbnailImage.thumbnailUrl} alt={tag.name || 'تصویر تگ'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {tag.name || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {tag.slug || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[300px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(tag.description || '-'))}
                  </Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveTagModal id={tag.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveTagModal>
                    <UpdateTagModal initialData={tag}>
                      <IconButton size='small'>
                        <i className='tabler-edit text-gray-500 text-lg' />
                      </IconButton>
                    </UpdateTagModal>
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

export default DesktopTagTable
