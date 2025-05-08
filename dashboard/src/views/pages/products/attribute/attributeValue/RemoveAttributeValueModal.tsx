import { removeAttribute } from '@/libs/api/productAttributes'
import { useRouter } from 'next/navigation'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

const RemoveAttributeValueModal = ({ id }: { id: number }) => {
  const router = useRouter()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeAttribute(id as string)

        router.refresh()

        return res
      }}
      dialogTitle='آیا از حذف متغییر اطمینان دارید؟'
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
