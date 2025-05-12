import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { removeAttributeValue } from '@/libs/api/productAttributeValues'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/query-keys'

const RemoveAttributeValueModal = ({ id }: { id: number }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeAttributeValue(id as string)

        invalidate(QueryKeys.Attributes)

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
      <i className='tabler-trash text-gray-500 text-lg' />
    </ConfirmDeleteModal>
  )
}

export default RemoveAttributeValueModal
