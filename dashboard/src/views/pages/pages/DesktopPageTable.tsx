'use client'

import { Box, IconButton, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import UpdatePageModal from './UpdatePageModal'
import RemovePageModal from './RemovePageModal'
import { stripHtml, truncateText } from '@/utils/formatters'
import { Page } from '@/types/app/page.type'

const DesktopPageTable = ({ pages }: { pages: Page[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>نام برگه </th>
            <th>نامک برگه </th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {pages.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                هیچ برگه‌ای یافت نشد
              </td>
            </tr>
          ) : (
            pages.map(page => (
              <tr key={page.id}>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {page.name || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {page.slug || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[300px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(page.description || '-'))}
                  </Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemovePageModal id={page.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemovePageModal>
                    <UpdatePageModal initialData={page}>
                      <IconButton size='small'>
                        <i className='tabler-edit text-gray-500 text-lg' />
                      </IconButton>
                    </UpdatePageModal>
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

export default DesktopPageTable
