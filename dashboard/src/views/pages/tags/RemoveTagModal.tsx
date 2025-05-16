import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeCategory } from '@/libs/api/category.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemoveCategoryModalProps {
  id: number
  children: ReactNode
}

const RemoveCategoryModal = ({ id, children }: RemoveCategoryModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeCategory(id as string)

        if (res.status === 200) invalidate(QueryKeys.Categories)

        return res
      }}
      dialogTitle='آیا از حذف برچسب اطمینان دارید؟'
      messages={{
        success: 'برچسب با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این برچسب را ندارید',
        notFound: 'برچسب مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف برچسب'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveCategoryModal
