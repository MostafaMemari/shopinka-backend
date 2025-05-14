import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeCategory } from '@/libs/api/category.api'
import { removeProduct } from '@/libs/api/product.api'
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
        const res = await removeProduct(id as string)

        if (res.status === 200) invalidate(QueryKeys.Products)

        return res
      }}
      dialogTitle='آیا از حذف محصول اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'محصول با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این محصول را ندارید',
        notFound: 'محصول مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف محصول'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveCategoryModal
