import { useState } from 'react'
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, MenuItem } from '@mui/material'
import { AttributeFormValues, AttributeType } from '@/types/productAttributes'
import { createAttributeSchema } from '@/libs/validators/attribute.schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAttribute } from '@/libs/api/productAttributes'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorAttributeMessage } from '@/messages/auth/attributeMessages'
import { useRouter } from 'next/navigation'
import getChangedFields from '@/utils/getChangedFields'

const UpdateAttributeModal = ({ initialData }: { initialData: Partial<AttributeFormValues> }) => {
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
  } = useForm({
    resolver: yupResolver(createAttributeSchema),
    defaultValues: {
      name: initialData?.name,
      slug: initialData?.slug ?? undefined,
      type: initialData?.type,
      description: initialData.description || null
    }
  })

  const onSubmit = async (formData: AttributeFormValues) => {
    try {
      if (initialData?.id !== undefined) {
        const changedData = getChangedFields(initialData, {
          ...formData,
          slug: formData.slug || null,
          description: formData.description || null
        })

        if (Object.keys(changedData).length === 0) {
          showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })

          return
        }

        const res = await updateAttribute(String(initialData.id), changedData)

        const errorMessage = handleApiError(res.status, errorAttributeMessage)

        if (errorMessage) return showToast({ type: 'error', message: errorMessage })

        if (res.status === 200) {
          showToast({ type: 'success', message: 'ویژگی با موفقیت ویرایش شد' })
          router.push('/products/attributes')
        }

        reset()
        handleClose()
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
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name='slug'
            control={control}
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

export default UpdateAttributeModal
