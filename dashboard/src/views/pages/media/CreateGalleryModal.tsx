import { useState, useEffect } from 'react' // اضافه کردن useEffect
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { type GalleryForm } from '@/types/gallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { useRouter } from 'next/navigation'
import { errorGalleryMessage } from '@/messages/auth/galleryMessages'
import { gallerySchema } from '@/libs/validators/gallery.schemas'
import { createGallery } from '@/libs/api/gallery'

const CreateGalleryModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<GalleryForm>({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  useEffect(() => {
    reset({
      title: '',
      description: null
    })
  }, [reset])

  const onSubmit = async (formData: GalleryForm) => {
    try {
      const res = await createGallery({
        title: formData.title,
        description: formData.description || null
      })

      const errorMessage = handleApiError(res.status, errorGalleryMessage)

      if (errorMessage) {
        showToast({ type: 'error', message: errorMessage })

        return
      }

      if (res.status === 201 || res.status === 200) {
        showToast({ type: 'success', message: 'گالری با موفقیت ثبت شد' })
        router.refresh()

        reset({
          title: '',
          description: null
        })
        handleClose()
      }
    } catch (error: any) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  return (
    <div>
      <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />}>
        ثبت گالری جدید
      </Button>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='افزودن گالری جدید'
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
              <CustomTextField {...field} fullWidth label='نام گالری' placeholder='لطفا نام گالری را وارد کنید' error={!!errors.title} helperText={errors.title?.message} />
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
                placeholder='لطفا توضیحات گالری را وارد کنید'
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

export default CreateGalleryModal
