'use client'

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { removeShipping } from '@/libs/api/shipping.api'

const RemoveShippingModal = ({ id }: { id: string }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeShipping(id as string)

        if (res.status === 200) invalidate(QueryKeys.Shippings)

        return res
      }}
      dialogTitle='آیا از حذف روش حمل و نقل اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'روش حمل و نقل با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این روش حمل و نقل را ندارید',
        notFound: 'روش حمل و نقل مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف روش حمل و نقل'
      }}
      buttonText='حذف'
    >
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveShippingModal
