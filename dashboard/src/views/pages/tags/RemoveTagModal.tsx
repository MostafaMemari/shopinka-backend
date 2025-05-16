import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeTag } from '@/libs/api/tag.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemoveTagModalProps {
  id: number
  children: ReactNode
}

const RemoveTagModal = ({ id, children }: RemoveTagModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeTag(id as string)

        if (res.status === 200) invalidate(QueryKeys.Tags)

        return res
      }}
      dialogTitle='آیا از حذف برچسب اطمینان دارید؟'
      dialogMessage=''
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

export default RemoveTagModal
