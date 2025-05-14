import { useState, ReactNode, useCallback } from 'react' // اضافه کردن useEffect
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { Gallery, type GalleryForm } from '@/types/app/gallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateGallery } from '@/libs/api/gallery.api'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorGalleryMessage } from '@/messages/auth/galleryMessages'
import getChangedFields from '@/utils/getChangedFields'
import { gallerySchema } from '@/libs/validators/gallery.schema'
import { QueryKeys } from '@/types/enums/query-keys'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { cleanObject } from '@/utils/formatters'
import FormActions from '@/components/FormActions'

interface UpdateGalleryModalProps {
  initialData: Gallery
  children?: ReactNode
}

const UpdateGalleryModal = ({ children, initialData }: UpdateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? ''
    }
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: GalleryForm) => {
      setIsLoading(true)

      try {
        if (initialData?.id !== undefined) {
          const cleanedData = cleanObject(formData)
          const changedData = getChangedFields(initialData, cleanedData)

          if (formData.description === null && !('description' in cleanedData)) changedData.description = ''

          if (Object.keys(changedData).length === 0) {
            showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })

            return
          }

          const { status } = await updateGallery(String(initialData.id), changedData)

          const errorMessage = handleApiError(status, errorGalleryMessage)

          if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })

            return
          }

          if (status === 200) {
            showToast({ type: 'success', message: 'گالری با موفقیت ویرایش شد' })
            invalidate(QueryKeys.Galleries)
            handleClose()
          }
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, initialData, invalidate]
  )

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش دسته‌بندی'>
        {children || (
          <IconButton size='small'>
            <i className='tabler-edit text-gray-500 text-lg' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='بروزرسانی گالری'
        defaultMaxWidth='xs'
        actions={
          <>
            <FormActions onCancel={handleClose} submitText='بروزرسانی' onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='title'
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام گالری' placeholder='لطفا نام گالری را وارد کنید' error={!!errors.title} helperText={errors.title?.message} />
            )}
          />
          <Controller
            name='description'
            control={control}
            disabled={isLoading}
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

export default UpdateGalleryModal
