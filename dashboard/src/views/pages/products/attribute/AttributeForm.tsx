'use client'

import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { MenuItem } from '@mui/material'
import { AttributeType } from '@/types/app/productAttributes.type'

interface AttributeFormProps {
  control: any
  errors: any
  isLoading: boolean
}

const AttributeForm = ({ control, errors, isLoading }: AttributeFormProps) => {
  return (
    <form className='flex flex-col gap-5'>
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
            value={field.value || ''}
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
  )
}

export default AttributeForm
