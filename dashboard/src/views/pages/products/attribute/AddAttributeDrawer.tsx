// React Imports
import { useState } from 'react'

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
import { AttributeType } from '@/types/attributes'
import type { CreateAttributeFormValues } from '@/types/attributes'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { createAttributeSchema } from '@/libs/validators/attribute.schemas'

type Props = {
  open: boolean
  handleClose: () => void
  attributeData: AttributeType[]
  setData: (data: AttributeType[]) => void
}

const AddattributeDrawer = (props: Props) => {
  // Props
  const { open, handleClose, attributeData, setData } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateAttributeFormValues>({
    resolver: yupResolver(createAttributeSchema),
    defaultValues: {
      name: '',
      slug: null, // برای سازگاری با nullable
      type: AttributeType.COLOR,
      description: null // برای سازگاری با nullable
    }
  })

  // Handle Form Submit
  const handleFormSubmit = (data: CreateAttributeFormValues) => {
    console.log('Form Values:', data) // لاگ کردن مقادیر فرم

    // اگر نیاز به افزودن داده به attributeData داری، این بخش رو فعال کن
    /*
    const newData = {
      id: attributeData.length + 1,
      attributeName: data.name,
      description: data.description || '',
      totalProduct: Math.floor(Math.random() * 9000) + 1000,
      totalEarning: Math.floor(Math.random() * 90000) + 10000,
      image: `/images/apps/ecommerce/product-${Math.floor(Math.random() * 20) + 1}.png`
    }
    setData([...attributeData, newData])
    */

    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm({
      name: '',
      slug: null,
      type: AttributeType.COLOR,
      description: null
    })
  }

  return (
    <Drawer open={open} anchor='right' variant='temporary' onClose={handleReset} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}>
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>ثبت ویژگی جدید</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name='slug'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''} // برای جلوگیری از uncontrolled input
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
                onChange={e => field.onChange(e.target.value)}
                value={field.value}
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
                value={field.value ?? ''} // برای جلوگیری از uncontrolled input
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
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddattributeDrawer
