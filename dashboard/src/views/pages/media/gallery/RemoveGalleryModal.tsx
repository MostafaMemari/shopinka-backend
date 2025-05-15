import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { removeGallery } from '@/libs/api/gallery.api'

const RemoveGalleryModal = ({ id }: { id: string }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeGallery(id as string)

        if (res.status === 200) invalidate(QueryKeys.Galleries)

        return res
      }}
      dialogTitle='آیا از حذف گالری اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'گالری با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این گالری را ندارید',
        notFound: 'گالری مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف گالری'
      }}
      buttonText='حذف'
    >
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveGalleryModal
