import { useState } from 'react'
import { DialogContentText, Button, CircularProgress, DialogContent, IconButton } from '@mui/material'
import { removeGallery } from '@/libs/api/gallery'
import { showToast } from '@/utils/showToast'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/query-keys'

const RemoveGalleryModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [galleryId, setGalleryId] = useState<string | null>(null)
  const { invalidate } = useInvalidateQuery()

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleOpen = (id: string) => {
    setGalleryId(id)
    setOpen(true)
  }

  const handleConfirm = async () => {
    if (!galleryId || isDeleting) return
    setIsDeleting(true)

    try {
      const res = await removeGallery(galleryId)

      if (res.status === 200) {
        showToast({ type: 'success', message: 'حذف گالری با موفقیت انجام شد' })
        invalidate(QueryKeys.Galleries)
      } else if (res.status === 400) showToast({ type: 'error', message: 'حذف گالری با خطا مواجه شد' })
      else if (res.status === 404) showToast({ type: 'error', message: 'شما دسترسی حذف این گالری را ندارید' })

      setOpen(false)
      setGalleryId(null)
    } catch (error) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setGalleryId(null)
  }

  return (
    <div>
      <IconButton size='small' onClick={() => handleOpen(id)}>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>

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
    </div>
  )
}

export default RemoveGalleryModal
