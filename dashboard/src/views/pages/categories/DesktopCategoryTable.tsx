'use client'

// React Imports
import { Box, Chip, IconButton, Typography } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { Category } from '@/types/app/category.type'
import UpdateCategoryModal from './UpdateCategoryModal'
import RemoveCategoryModal from './RemoveCategoryModal'
import { stripHtml, truncateText } from '@/utils/formatters'

const DesktopCategoryTable = ({ categories }: { categories: Category[] }) => {
  const renderCategoryRow = (category: Category, level: number = 0): JSX.Element[] => {
    const rows: JSX.Element[] = []

    rows.push(
      <tr key={category.id}>
        <td>
          {category.thumbnailImageId ? (
            <img src={category?.thumbnailImage?.thumbnailUrl} alt={category.name || 'تصویر دسته‌بندی'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          ) : (
            <Typography color='text.secondary'>-</Typography>
          )}
        </td>
        <td>
          <Typography className={`font-medium`} color='text.primary' style={{ marginRight: `${level * 12}px` }}>
            {`${'-'.repeat(level)} ${category.name}`}
          </Typography>
        </td>
        <td>
          <Typography className='font-medium' color='text.primary'>
            {category.slug || '-'}
          </Typography>
        </td>
        <td>
          <Typography className='font-medium line-clamp-2 max-w-[300px] text-ellipsis overflow-hidden' color='text.primary'>
            {truncateText(stripHtml(category.description || '-'))}
          </Typography>
        </td>
        <td>
          <Chip label={category.type === 'PRODUCT' ? 'محصول' : 'وبلاگ'} color={category.type === 'PRODUCT' ? 'primary' : 'success'} size='small' variant='outlined' />
        </td>
        <td>
          <Box display='flex' alignItems='center' gap={2}>
            <RemoveCategoryModal id={category.id}>
              <IconButton size='small'>
                <i className='tabler-trash text-gray-500 text-lg' />
              </IconButton>
            </RemoveCategoryModal>

            <UpdateCategoryModal initialData={category}>
              <IconButton size='small'>
                <i className='tabler-edit text-gray-500 text-lg' />
              </IconButton>
            </UpdateCategoryModal>
          </Box>
        </td>
      </tr>
    )

    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        rows.push(...renderCategoryRow(child, level + 1))
      })
    }

    return rows
  }

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام دسته‌بندی</th>
            <th>نامک دسته‌بندی</th>
            <th>توضیحات</th>
            <th>نوع</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            categories.filter(cat => cat.parentId === null).flatMap(cat => renderCategoryRow(cat))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopCategoryTable
