'use client'

// MUI Imports
import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { FormControlLabel, Switch } from '@mui/material'

interface ShippingFormProps {
  control: any
  errors: any
  isLoading: boolean
}

const ShippingForm = ({ control, errors, isLoading }: ShippingFormProps) => {
  return (
    <form className='flex flex-col gap-5'>
      <Controller
        name='name'
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <CustomTextField {...field} fullWidth label='نام روش حمل' placeholder='لطفا نام روش حمل را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
        )}
      />
      <Controller
        name='price'
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <CustomTextField
            {...field}
            type='number'
            fullWidth
            label='هزینه (تومان)'
            placeholder='لطفا هزینه را وارد کنید'
            error={!!errors.price}
            helperText={errors.price?.message}
            value={field.value ?? ''}
            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
          />
        )}
      />
      <Controller
        name='estimatedDays'
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <CustomTextField
            {...field}
            type='number'
            fullWidth
            label='مدت زمان تخمینی (روز)'
            placeholder='لطفا مدت زمان تخمینی را وارد کنید'
            error={!!errors.estimatedDays}
            helperText={errors.estimatedDays?.message}
            value={field.value ?? ''}
            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
          />
        )}
      />
      <Controller
        name='isActive'
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value ?? false} onChange={e => field.onChange(e.target.checked)} disabled={isLoading} />}
            label='فعال'
            sx={{ margin: 0 }}
          />
        )}
      />
    </form>
  )
}

export default ShippingForm
