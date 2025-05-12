import { useState, useEffect, ReactNode, useCallback } from 'react'
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { type GalleryForm } from '@/types/gallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorGalleryMessage } from '@/messages/auth/galleryMessages'
import { gallerySchema } from '@/libs/validators/gallery.schemas'
import { createGallery } from '@/libs/api/gallery'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/query-keys'
import { cleanObject } from '@/utils/formatters'
import FormActions from '@/components/FormActions'

interface CreateGalleryModalProps {
  children?: ReactNode
}

const CreateGalleryModal = ({ children }: CreateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

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

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: GalleryForm) => {
      setIsLoading(true)

      try {
        const cleanedData = cleanObject(formData)
        const { status } = await createGallery(cleanedData)

        const errorMessage = handleApiError(status, errorGalleryMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })

          return
        }

        if (status === 200 || status === 201) {
          showToast({ type: 'success', message: 'گالری با موفقیت ثبت شد' })
          invalidate(QueryKeys.Attributes)
          handleClose()
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, invalidate]
  )

  return (
    <div>
      {children || (
        <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />}>
          ثبت گالری جدید
        </Button>
      )}

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='افزودن گالری جدید'
        defaultMaxWidth='xs'
        actions={
          <>
            <FormActions onCancel={handleClose} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
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
