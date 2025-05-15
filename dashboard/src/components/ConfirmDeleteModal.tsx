import { useState } from 'react'
import { Button, CircularProgress, DialogContent, DialogContentText } from '@mui/material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { showToast } from '@/utils/showToast'
import FormActions from './FormActions'

type ConfirmDeleteModalProps = {
  id: string | number
  onDelete: (id: string | number) => Promise<{ status: number }>
  children: React.ReactNode
  dialogTitle?: string
  dialogMessage?: string
  messages?: {
    success?: string
    error?: string
    unauthorized?: string
    notFound?: string
    badRequest?: string
    validationError?: string
    serverError?: string
  }
  buttonText?: string
}

const ConfirmDeleteModal = ({
  id,
  onDelete,
  children,
  dialogTitle = 'آیا از حذف اطمینان دارید؟',
  dialogMessage = 'این عملیات قابل بازگشت نیست',
  messages,
  buttonText = 'حذف'
}: ConfirmDeleteModalProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleCancel = () => {
    if (isDeleting) return
    setOpen(false)
  }

  const handleConfirm = async () => {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const res = await onDelete(id)

      switch (res.status) {
        case 200:
        case 201:
          showToast({ type: 'success', message: messages?.success || 'با موفقیت حذف شد' })
          break
        case 400:
          showToast({ type: 'error', message: messages?.badRequest || 'درخواست نامعتبر بود' })
          break
        case 401:
        case 403:
          showToast({ type: 'error', message: messages?.unauthorized || 'شما دسترسی لازم را ندارید' })
          break
        case 404:
          showToast({ type: 'error', message: messages?.notFound || 'موردی برای حذف یافت نشد' })
          break
        case 422:
          showToast({ type: 'error', message: messages?.validationError || 'خطای اعتبارسنجی رخ داده است' })
          break
        case 500:
          showToast({ type: 'error', message: messages?.serverError || 'خطای داخلی سرور' })
          break
        default:
          showToast({ type: 'error', message: messages?.error || 'خطای ناشناخته هنگام حذف' })
      }
    } catch {
      showToast({ type: 'error', message: messages?.error || 'خطای سیستمی در عملیات حذف' })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      <span onClick={handleOpen} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {children}
      </span>

      <CustomDialog
        open={open}
        onClose={handleCancel}
        title={dialogTitle}
        defaultMaxWidth='sm'
        actions={
          <>
            <FormActions submitText='حذف' submitColor='error' onCancel={handleCancel} onSubmit={handleConfirm} isLoading={isDeleting} />
          </>
        }
      >
        {dialogMessage && (
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
        )}
      </CustomDialog>
    </>
  )
}

export default ConfirmDeleteModal
