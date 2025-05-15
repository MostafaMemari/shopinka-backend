'use client'

import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import tableStyles from '@core/styles/table.module.css'
import { Comment } from '@/types/app/comment.type'
import RemoveCommentModal from './RemoveCommentModal'
import CommentDetailsModal from './CommentDetailsModal' // New component
import { stripHtml, truncateText } from '@/utils/formatters'
import CommentStatusToggle from './CommentStatusToggle.tsx'

const DesktopCommentTable = ({ comments }: { comments: Comment[] }) => {
  const router = useRouter()

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر محصول</th>
            <th>عنوان نظر</th>
            <th>محصول</th>
            <th>محتوا</th>
            <th>کاربر</th>
            <th>امتیاز</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {comments.length === 0 ? (
            <tr>
              <td colSpan={7} className='text-center'>
                داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            comments.map(comment => (
              <tr key={comment.id}>
                <td>
                  {comment.product?.mainImageId && comment.product?.mainImage?.thumbnailUrl ? (
                    <img src={comment.product.mainImage.thumbnailUrl} alt={comment.product.name || 'تصویر محصول'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {truncateText(comment.title || '-', 30)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {truncateText(comment.product?.name || '-', 30)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[250px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(comment.content || '-'), 50)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {truncateText(comment.user?.fullName || comment.user?.mobile || '-', 20)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {comment.rate || '-'}
                  </Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CommentStatusToggle id={comment.id} isActive={comment.isActive} />
                    <CommentDetailsModal comment={comment} />
                    <RemoveCommentModal id={comment.id} />
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

export default DesktopCommentTable
