'use client'

// React Imports
import { useCallback } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Type Imports
import type { attributeType } from './ProductAttributeTable'
import { createAttributeSchema } from '@/libs/validators/attribute.schemas'
import { AttributeType } from '@/types/attributes'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  data: attributeType[]
  setData: (data: attributeType[]) => void
}

const AddAttributeDrawer = ({ open, handleClose, data, setData }: Props) => {
  // Form hook
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createAttributeSchema),
    defaultValues: {
      name: '',
      slug: null,
      type: AttributeType.COLOR,
      description: null
    }
  })

  // Handle form submission
  const onSubmit = useCallback(
    (formData: any) => {
      const newAttribute: attributeType = {
        id: data.length + 1, // Simple ID generation, replace with UUID or backend ID later
        attributeName: formData.name,
        description: formData.description || '',
        values: formData.type // Map type to values
      }

      setData([...data, newAttribute])
      reset() // Reset form
      handleClose() // Close drawer
    },
    [data, setData, reset, handleClose]
  )

  // Handle form reset
  const onReset = useCallback(() => {
    reset({
      name: '',
      slug: null,
      type: AttributeType.COLOR,
      description: null
    })
    handleClose()
  }, [reset, handleClose])

  return (
    <Drawer open={open} anchor='right' variant='temporary' onClose={onReset} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}>
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>ثبت ویژگی جدید</Typography>
        <IconButton size='small' onClick={onReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
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
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              ثبت
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={onReset}>
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddAttributeDrawer
