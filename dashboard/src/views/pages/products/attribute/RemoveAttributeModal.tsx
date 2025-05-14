import { removeAttribute } from '@/libs/api/attributes.api'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'

const RemoveAttributeModal = ({ id }: { id: number }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeAttribute(id as string)

        if (res.status === 200) invalidate(QueryKeys.Attributes)

        return res
      }}
      dialogTitle='آیا از حذف ویژگی اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'ویژگی با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این ویژگی را ندارید',
        notFound: 'ویژگی مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف ویژگی'
      }}
      buttonText='حذف'
    >
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveAttributeModal
