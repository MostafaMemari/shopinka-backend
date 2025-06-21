import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeContact } from '@/libs/api/contact.api' // توجه به فایل درست
import { QueryKeys } from '@/types/enums/query-keys'
import { IconButton, Tooltip } from '@mui/material'
import { ReactNode } from 'react'

interface RemoveContactModalProps {
  id: number
  children?: ReactNode
}

const RemoveContactModal = ({ id }: RemoveContactModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeContact(id as string)

        if (res.status === 200) invalidate(QueryKeys.Contacts)

        return res
      }}
      dialogTitle='آیا از حذف پیام تماس اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'پیام تماس با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این پیام تماس را ندارید',
        notFound: 'پیام تماس مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف پیام تماس'
      }}
      buttonText='حذف'
    >
      <Tooltip title='حذف پیام تماس'>
        <IconButton size='small'>
          <i className='tabler-trash text-gray-500 text-lg' />
        </IconButton>
      </Tooltip>
    </ConfirmDeleteModal>
  )
}

export default RemoveContactModal
