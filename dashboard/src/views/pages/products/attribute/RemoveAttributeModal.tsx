import { removeAttribute } from '@/libs/api/productAttributes'
import { useRouter } from 'next/navigation'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

const RemoveAttributeModal = ({ id }: { id: number }) => {
  const router = useRouter()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeAttribute(id as string)

        router.refresh()

        return res
      }}
      dialogTitle='آیا از حذف ویژگی اطمینان دارید؟'
      messages={{
        success: 'ویژگی با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این ویژگی را ندارید',
        notFound: 'ویژگی مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف ویژگی'
      }}
      buttonText='حذف ویژگی'
    >
      <i className='tabler-trash text-gray-500 text-lg' />
    </ConfirmDeleteModal>
  )
}

export default RemoveAttributeModal
