'use client'

// React Imports
import { Box, IconButton, Typography } from '@mui/material'

// Component Imports
import Link from 'next/link'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { Category } from '@/types/category'
import UpdateCategoryModal from './UpdateCategoryModal'

const DesktopCategoryTable = ({ data, paginatedData }: { data: Category[]; paginatedData: Category[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>تصویر</th>
          <th>نام گالری</th>
          <th>نامک گالری</th>
          <th>توضیحات</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.length === 0 ? (
          <tr>
            <td colSpan={5} className='text-center'>
              داده‌ای موجود نیست
            </td>
          </tr>
        ) : (
          paginatedData.map(row => (
            <tr key={row.id}>
              <td>
                {row.thumbnailImageId ? (
                  <img src={String(row.thumbnailImageId)} alt={row.name || 'تصویر گالری'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                ) : (
                  <Typography color='text.secondary'>-</Typography>
                )}
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.name || '-'}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.slug || '-'}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.description || '-'}
                </Typography>
              </td>
              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  {/* <RemoveCategoryModal id={String(row.id)} /> */}
                  <Link href={`/media/${row.id}`}>
                    <IconButton size='small'>
                      <i className='tabler-eye text-gray-500 text-lg' />
                    </IconButton>
                  </Link>
                  <UpdateCategoryModal category={row}>
                    <IconButton size='small'>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  </UpdateCategoryModal>
                </Box>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)

export default DesktopCategoryTable
