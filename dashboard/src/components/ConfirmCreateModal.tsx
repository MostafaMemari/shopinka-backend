import { useState } from 'react'
import { Button, CircularProgress, DialogContent } from '@mui/material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { showToast } from '@/utils/showToast'

type ConfirmCreateModalProps = {
  onCreate: () => Promise<{ status: number }>
  children: React.ReactNode
  formContent: React.ReactNode
  messages?: {
    dialogTitle?: string
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

const ConfirmCreateModal = ({ onCreate, children, formContent, messages = {}, buttonText = 'ایجاد' }: ConfirmCreateModalProps) => {
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleCancel = () => {
    if (!isCreating) setOpen(false)
  }

  const handleConfirm = async () => {
    if (isCreating) return
    setIsCreating(true)

    try {
      const res = await onCreate()

      switch (res.status) {
        case 200:
        case 201:
          showToast({ type: 'success', message: messages.success || 'با موفقیت ایجاد شد' })
          break
        case 400:
          showToast({ type: 'error', message: messages.badRequest || 'درخواست نامعتبر بود' })
          break
        case 401:
        case 403:
          showToast({ type: 'error', message: messages.unauthorized || 'شما دسترسی لازم را ندارید' })
          break
        case 404:
          showToast({ type: 'error', message: messages.notFound || 'موردی یافت نشد' })
          break
        case 422:
          showToast({ type: 'error', message: messages.validationError || 'خطای اعتبارسنجی رخ داده است' })
          break
        case 500:
          showToast({ type: 'error', message: messages.serverError || 'خطای داخلی سرور' })
          break
        default:
          showToast({ type: 'error', message: messages.error || 'خطای ناشناخته هنگام ایجاد' })
      }
    } catch {
      showToast({ type: 'error', message: messages.error || 'خطای سیستمی در عملیات ایجاد' })
    } finally {
      setIsCreating(false)
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
        title={messages.dialogTitle || 'آیا از ایجاد اطمینان دارید؟'}
        defaultMaxWidth='sm'
        actions={
          <>
            <Button onClick={handleCancel} color='secondary' disabled={isCreating}>
              لغو
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isCreating}
              variant='contained'
              color='primary'
              startIcon={isCreating ? <CircularProgress size={20} color='inherit' /> : null}
            >
              {isCreating ? 'در حال ایجاد...' : buttonText}
            </Button>
          </>
        }
      >
        <DialogContent>{formContent}</DialogContent>
      </CustomDialog>
    </>
  )
}

export default ConfirmCreateModal
