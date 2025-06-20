import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removePage } from '@/libs/api/page.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemovePageModalProps {
  id: number
  children: ReactNode
}

const RemovePageModal = ({ id, children }: RemovePageModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removePage(id as string)

        if (res.status === 200) invalidate(QueryKeys.Pages)

        return res
      }}
      dialogTitle='آیا از حذف برگه اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'برگه با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این برگه را ندارید',
        notFound: 'برگه مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف برگه'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemovePageModal
