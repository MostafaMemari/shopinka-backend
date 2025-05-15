import { useState, ReactNode, useCallback } from 'react' // اضافه کردن useEffect
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { MenuItem } from '@mui/material'
import { AttributeType, type AttributeFormType } from '@/types/app/productAttributes'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAttribute } from '@/libs/api/productAttributes.api'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorAttributeMessage } from '@/messages/auth/attributeMessages'
import { attributeSchema } from '@/libs/validators/attribute.schema'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import FormActions from '@/components/FormActions'
import { cleanObject } from '@/utils/formatters'
import { QueryKeys } from '@/types/enums/query-keys'

interface CreateAttributeModalProps {
  children?: ReactNode
}

const CreateAttributeModal = ({ children }: CreateAttributeModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<AttributeFormType>({
    resolver: yupResolver(attributeSchema),
    defaultValues: {
      name: '',
      slug: '',
      type: AttributeType.COLOR,
      description: ''
    }
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: AttributeFormType) => {
      setIsLoading(true)

      try {
        const cleanedData = cleanObject(formData)
        const { status } = await createAttribute(cleanedData)

        const errorMessage = handleApiError(status, errorAttributeMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })

          return
        }

        if (status === 201 || status === 200) {
          showToast({ type: 'success', message: 'ویژگی با موفقیت ثبت شد' })
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
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت ویژگی جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت ویژگی جدید'
        defaultMaxWidth='xs'
        actions={
          <>
            <FormActions submitText='ثبت' onCancel={handleClose} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
          </>
        }
      >
        <form
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }
          }}
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <Controller
            name='name'
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name='slug'
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='نامک'
                placeholder='لطفا نامک ویژگی را وارد کنید'
                error={!!errors.slug}
                helperText={errors.slug?.message}
                onChange={e => field.onChange(e.target.value || null)}
              />
            )}
          />
          <Controller
            name='type'
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='نوع'
                error={!!errors.type}
                helperText={errors.type?.message}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
              >
                <MenuItem value={AttributeType.COLOR}>رنگ</MenuItem>
                <MenuItem value={AttributeType.BUTTON}>دکمه</MenuItem>
              </CustomTextField>
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

export default CreateAttributeModal
