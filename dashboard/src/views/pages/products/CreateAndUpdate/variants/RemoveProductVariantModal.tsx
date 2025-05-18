import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeProductVariant } from '@/libs/api/productVariants.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemoveProductVariantModalProps {
  id: number
  children: ReactNode
}

const RemoveProductVariantModal = ({ id, children }: RemoveProductVariantModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeProductVariant(id as string)

        if (res.status === 200) invalidate(QueryKeys.ProductVariants)

        return res
      }}
      dialogTitle='آیا از حذف متغییر اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'متغییر با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این متغییر را ندارید',
        notFound: 'متغییر مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف متغییر'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveProductVariantModal
