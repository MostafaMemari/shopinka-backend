import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeComment } from '@/libs/api/comment.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { IconButton, Tooltip } from '@mui/material'
import { ReactNode } from 'react'

interface RemoveCommentModalProps {
  id: number
  children?: ReactNode
}

const RemoveCommentModal = ({ id }: RemoveCommentModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeComment(id as string)

        if (res.status === 200) invalidate(QueryKeys.Categories)

        return res
      }}
      dialogTitle='آیا از حذف نظر اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'نظر با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این نظر را ندارید',
        notFound: 'نظر مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف نظر'
      }}
      buttonText='حذف'
    >
      <Tooltip title='حذف نظر'>
        <IconButton size='small'>
          <i className='tabler-trash text-gray-500 text-lg' />
        </IconButton>
      </Tooltip>
    </ConfirmDeleteModal>
  )
}

export default RemoveCommentModal
