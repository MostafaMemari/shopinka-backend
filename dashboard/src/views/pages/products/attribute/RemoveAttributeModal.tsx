import { useState } from 'react'
import ConfirmDeleteDialog from '@/@core/components/mui/ConfirmDeleteDialog'
import { IconButton } from '@mui/material'
import { removeAttribute } from '@/libs/api/productAttributes'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'

const RemoveAttributeModal = ({ id }: { id: number }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [attributeId, setAttributeId] = useState<string | null>(null)
  const router = useRouter()

  const handleOpen = (id: string) => {
    setAttributeId(id)
    setOpen(true)
  }

  const handleConfirm = async () => {
    try {
      if (attributeId) {
        const res = await removeAttribute(attributeId)

        if (res.status === 200) {
          showToast({ type: 'success', message: 'حذف ویژگی با موفقیت انجام شد' })
          router.refresh()
        } else if (res.status === 400) showToast({ type: 'error', message: 'حذف ویژگی با خطا مواجه شد' })
        else if (res.status === 404) showToast({ type: 'error', message: 'شما دسترسی حذف این ویژگی را ندارید' })
      }

      setOpen(false)
      setAttributeId(null)
    } catch (error) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setAttributeId(null)
  }

  return (
    <div>
      <IconButton size='small' onClick={() => handleOpen(id.toString())}>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>

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
    </div>
  )
}

export default RemoveAttributeModal
