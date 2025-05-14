'use client'

import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'

interface GalleryFormProps {
  control: any
  errors: any
  isLoading: boolean
}

const GalleryForm = ({ control, errors, isLoading }: GalleryFormProps) => {
  return (
    <form className='flex flex-col gap-5'>
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
  )
}

export default GalleryForm
