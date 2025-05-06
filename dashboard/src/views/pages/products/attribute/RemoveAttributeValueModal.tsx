import { useState, cloneElement } from 'react'
import ConfirmDeleteDialog from '@/@core/components/mui/ConfirmDeleteDialog'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'
import { removeAttributeValues } from '@/libs/api/productAttributeValues'

const RemoveAttributeValueModal = ({ id, children }: { id: number; children: React.ReactElement }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleOpen = () => setOpen(true)
  const handleCancel = () => setOpen(false)

  const handleConfirm = async () => {
    try {
      const res = await removeAttributeValues(id.toString())

      if (res.status === 200) {
        showToast({ type: 'success', message: 'حذف با موفقیت انجام شد' })
        router.refresh()
      } else if (res.status === 400) {
        showToast({ type: 'error', message: 'حذف ویژگی با خطا مواجه شد' })
      } else if (res.status === 400) {
        showToast({ type: 'error', message: 'شما دسترسی حذف این ویژگی را ندارید' })
      }
    } catch (err) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      {cloneElement(children, { onDelete: handleOpen })}
      <ConfirmDeleteDialog
        open={open}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title='آیا از حذف ویژگی اطمینان دارید؟'
        children='این عملیات قابل بازگشت نیست'
        confirmText='حذف'
        cancelText='لغو'
        defaultMaxWidth='sm'
      />
    </>
  )
}

export default RemoveAttributeValueModal
