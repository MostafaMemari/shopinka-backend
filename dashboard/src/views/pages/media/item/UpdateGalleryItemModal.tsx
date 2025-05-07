import { useState, useEffect, useMemo } from 'react'
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, CircularProgress, DialogContent } from '@mui/material'
import { type GalleryItemForm, type GalleryForm } from '@/types/gallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateGallery } from '@/libs/api/gallery'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorGalleryMessage } from '@/messages/auth/galleryMessages'
import { useRouter } from 'next/navigation'
import getChangedFields from '@/utils/getChangedFields'
import { gallerySchema } from '@/libs/validators/gallery.schemas'
import EditIcon from '@mui/icons-material/Edit'
import { updateGalleryItem } from '@/libs/api/galleyItem'

interface UpdateGalleryItemModalProps {
  initialData: Partial<GalleryItemForm>
  galleryItemId: string
}

const UpdateGalleryItemModal = ({ initialData, galleryItemId }: UpdateGalleryItemModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()

  const galleryForm: GalleryForm = useMemo(
    () => ({
      title: initialData?.title ?? '',
      description: initialData?.description ?? null
    }),
    [initialData]
  )

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: galleryForm.title,
      description: galleryForm.description
    }
  })

  useEffect(() => {
    reset({
      title: galleryForm.title,
      description: galleryForm.description
    })
  }, [galleryForm, reset])

  const onSubmit = async (formData: GalleryForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      if (galleryItemId) {
        const changedData = getChangedFields(initialData, {
          ...formData,
          description: formData.description ?? undefined // استفاده از undefined
        })

        if (Object.keys(changedData).length === 0) {
          showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })
          setIsSubmitting(false)

          return
        }

        const res = await updateGalleryItem(galleryItemId, changedData)

        const errorMessage = handleApiError(res.status, errorGalleryMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })
          setIsSubmitting(false)

          return
        }

        if (res.status === 200) {
          showToast({ type: 'success', message: 'ویژگی با موفقیت ویرایش شد' })
          handleClose()
          router.refresh()
        }
      }
    } catch (error: any) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <IconButton onClick={handleOpen} size='small'>
        <EditIcon fontSize='small' />
      </IconButton>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='بروزرسانی ویژگی'
        defaultMaxWidth='xs'
        actions={
          <>
            <Button onClick={handleClose} color='secondary' disabled={isSubmitting}>
              انصراف
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant='contained' disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null}>
              {isSubmitting ? 'در حال ثبت...' : 'ثبت'}
            </Button>
          </>
        }
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <CustomTextField {...field} fullWidth label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.title} helperText={errors.title?.message} />
              )}
            />
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  multiline
                  rows={4}
                  label='توضیحات'
                  placeholder='لطفا توضیحات ویژگی را وارد کنید'
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  onChange={e => field.onChange(e.target.value || null)}
                />
              )}
            />
          </form>
        </DialogContent>
      </CustomDialog>
    </div>
  )
}

export default UpdateGalleryItemModal
