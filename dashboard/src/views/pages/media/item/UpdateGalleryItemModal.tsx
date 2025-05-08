import { useState, useEffect } from 'react' // اضافه کردن useEffect
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, MenuItem } from '@mui/material'
import { Gallery, type GalleryForm } from '@/types/gallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateGallery } from '@/libs/api/gallery'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorGalleryMessage } from '@/messages/auth/galleryMessages'
import { useRouter } from 'next/navigation'
import getChangedFields from '@/utils/getChangedFields'
import { gallerySchema } from '@/libs/validators/gallery.schemas'

const UpdateGalleryItemModal = ({ initialData }: { initialData: Partial<Gallery> }) => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const galleryForm: GalleryForm = {
    title: initialData?.title ?? '',
    description: initialData?.description ?? ''
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: galleryForm?.title,
      description: galleryForm?.description || null
    }
  })

  useEffect(() => {
    reset({
      title: initialData?.title,
      description: initialData?.description || null
    })
  }, [initialData, reset])

  const onSubmit = async (formData: GalleryForm) => {
    try {
      if (initialData?.id !== undefined) {
        const changedData = getChangedFields(initialData, {
          ...formData,
          description: formData.description || null
        })

        if (Object.keys(changedData).length === 0) {
          showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })

          return
        }

        const res = await updateGallery(String(initialData.id), changedData)

        const errorMessage = handleApiError(res.status, errorGalleryMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })

          return
        }

        if (res.status === 200) {
          showToast({ type: 'success', message: 'ویژگی با موفقیت ویرایش شد' })
          router.refresh()

          reset({
            title: formData.title || '',
            description: formData.description || null
          })
          handleClose()
        }
      }
    } catch (error: any) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  return (
    <div>
      <IconButton size='small' onClick={handleOpen}>
        <i className='tabler-edit text-gray-500 text-lg' />
      </IconButton>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='بروزرسانی ویژگی'
        defaultMaxWidth='xs'
        actions={
          <>
            <Button onClick={handleClose} color='secondary'>
              انصراف
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant='contained'>
              ثبت
            </Button>
          </>
        }
      >
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
      </CustomDialog>
    </div>
  )
}

export default UpdateGalleryItemModal
