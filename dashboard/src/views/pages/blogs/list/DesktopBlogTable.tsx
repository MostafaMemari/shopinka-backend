'use client'

import { Box, IconButton, Typography, Chip } from '@mui/material'
import { useRouter } from 'next/navigation'
import tableStyles from '@core/styles/table.module.css'
import { stripHtml, truncateText } from '@/utils/formatters'
import RemoveBlogModal from './RemoveBlogModal'
import { Blog } from '@/types/app/blog.type'

const DesktopBlogTable = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter()

  const handleEditBlog = (id: number) => {
    router.push(`/blogs/edit?id=${id}`)
  }

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>عنوان</th>
            <th>نامک</th>
            <th>توضیحات</th>
            <th>وضعیت</th>
            <th>دسته‌بندی‌ها</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={7} className='text-center'>
                هیچ بلاگی یافت نشد
              </td>
            </tr>
          ) : (
            blogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  {blog.mainImageId && blog.mainImage?.thumbnailUrl ? (
                    <img src={blog.mainImage.thumbnailUrl} alt={blog.title || 'تصویر بلاگ'} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {blog.title || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {blog.slug || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[250px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(blog.content || '-'), 100)}
                  </Typography>
                </td>
                <td>
                  {blog.status ? (
                    <Chip label={blog.status === 'PUBLISHED' ? 'منتشر شده' : 'پیش‌نویس'} color={blog.status === 'PUBLISHED' ? 'success' : 'warning'} size='small' />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography color='text.primary'>{blog.categories && blog.categories.length > 0 ? blog.categories.map(cat => cat.name).join(', ') : '-'}</Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveBlogModal id={blog.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveBlogModal>
                    <IconButton size='small' onClick={() => handleEditBlog(blog.id)}>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
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

export default DesktopBlogTable
