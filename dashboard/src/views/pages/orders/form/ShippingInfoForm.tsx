'use client'

import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'

interface ShippingInfoFormProps {
  control: any
  errors: any
  isLoading: boolean
}

const ShippingInfoForm = ({ control, errors, isLoading }: ShippingInfoFormProps) => {
  return (
    <form className='flex flex-col gap-5'>
      <Controller
        name='trackingCode'
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <CustomTextField {...field} fullWidth label='کدرهگیری' placeholder='لطفا کدرهگیری را وارد کنید' error={!!errors.trackingCode} helperText={errors.trackingCode?.message} />
        )}
      />
    </form>
  )
}

export default ShippingInfoForm
