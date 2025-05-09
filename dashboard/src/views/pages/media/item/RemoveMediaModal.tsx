import { useState } from 'react'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { removeGalleryItem } from '@/libs/api/galleyItem'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'
import { Button, CircularProgress, DialogContent, DialogContentText } from '@mui/material'

interface RemoveGalleryItemModalProps {
  selectedImages: string[]
  onClearSelection: () => void
}

const RemoveGalleryItemModal = ({ selectedImages, onClearSelection }: RemoveGalleryItemModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [galleryItemIds, setGalleryItemIds] = useState<string[] | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const router = useRouter()

  const handleOpen = (selected: string[]) => {
    setGalleryItemIds(selected)
    setOpen(true)
  }

  const handleConfirm = async () => {
    if (!galleryItemIds || isDeleting) return
    setIsDeleting(true)

    try {
      const res = await removeGalleryItem(galleryItemIds)

      if (res.status === 200) {
        showToast({ type: 'success', message: 'حذف فایل با موفقیت انجام شد' })
        onClearSelection()
        router.refresh()
      } else if (res.status === 400) {
        showToast({ type: 'error', message: 'حذف فایل با خطا مواجه شد' })
      } else if (res.status === 404) {
        showToast({ type: 'error', message: 'شما دسترسی حذف این فایل را ندارید' })
      }

      setOpen(false)
      setGalleryItemIds(null)
    } catch (error) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setGalleryItemIds(null)
  }

  return (
    <>
      <div>
        <Button variant='contained' color='error' onClick={() => handleOpen(selectedImages)}>
          حذف {selectedImages.length} مورد
        </Button>

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
              <Button
                onClick={handleConfirm}
                variant='contained'
                color='error'
                disabled={!galleryItemIds?.length || isDeleting}
                startIcon={isDeleting ? <CircularProgress size={20} color='inherit' /> : null}
              >
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
    </>
  )
}

export default RemoveGalleryItemModal
