import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { removeCategory } from '@/libs/api/category'
import { useQueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface RemoveCategoryModalProps {
  id: number
  children: ReactNode
}

const RemoveCategoryModal = ({ id, children }: RemoveCategoryModalProps) => {
  const queryClient = useQueryClient()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeCategory(id as string)

        queryClient.invalidateQueries({ queryKey: ['categories'] })

        return res
      }}
      dialogTitle='آیا از حذف دسته‌بندی اطمینان دارید؟'
      messages={{
        success: 'دسته‌بندی با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این دسته‌بندی را ندارید',
        notFound: 'دسته‌بندی مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف دسته‌بندی'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveCategoryModal
