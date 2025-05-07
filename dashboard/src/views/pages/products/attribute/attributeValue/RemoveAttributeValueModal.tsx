import { useState, cloneElement } from 'react'
import ConfirmDeleteDialog from '@/@core/components/mui/ConfirmDeleteDialog'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'
import { removeAttributeValues } from '@/libs/api/productAttributeValues'
import { Box, Button, Chip, CircularProgress, DialogContent, DialogContentText } from '@mui/material'
import UpdateAttributeValuesModal from './UpdateAttributeValuesModal'
import CustomDialog from '@/@core/components/mui/CustomDialog'

const RemoveAttributeValueModal = ({ id, children }: { id: number; children: React.ReactElement }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [attributeValueId, setAttributeValueId] = useState<string | null>(null)

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleOpen = (id: string) => {
    setAttributeValueId(id)
    setOpen(true)
  }

  const handleCancel = () => setOpen(false)

  const handleConfirm = async () => {
    if (!attributeValueId || isDeleting) return
    setIsDeleting(true)

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
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      {cloneElement(children, { onDelete: handleOpen })}

      <CustomDialog
        open={open}
        onClose={handleCancel}
        title='آیا از حذف فایل اطمینان دارید؟'
        defaultMaxWidth='sm'
        actions={
          <>
            <Button onClick={handleCancel} color='secondary'>
              لغو
            </Button>
            <Button onClick={handleConfirm} disabled={isDeleting} variant='contained' color='error' startIcon={isDeleting ? <CircularProgress size={20} color='inherit' /> : null}>
              {isDeleting ? 'در حال حذف...' : 'حذف'}
            </Button>
          </>
        }
      >
        <DialogContent>
          <DialogContentText>این عملیات قابل بازگشت نیست</DialogContentText>
        </DialogContent>
      </CustomDialog>
    </>
  )
}

export default RemoveAttributeValueModal
