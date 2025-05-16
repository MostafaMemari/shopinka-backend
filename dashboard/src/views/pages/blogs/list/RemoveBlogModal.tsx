import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeBlog } from '@/libs/api/blog.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemoveBlogModalProps {
  id: number
  children: ReactNode
}

const RemoveBlogModal = ({ id, children }: RemoveBlogModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeBlog(id as string)

        if (res.status === 200) invalidate(QueryKeys.Blogs)

        return res
      }}
      dialogTitle='آیا از حذف بلاگ اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'بلاگ با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این بلاگ را ندارید',
        notFound: 'بلاگ مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف بلاگ'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveBlogModal
