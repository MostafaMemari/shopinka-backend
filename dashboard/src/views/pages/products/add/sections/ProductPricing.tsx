'use client'

import { useFormContext } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const ProductPricing = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Card>
      <CardHeader title='قیمت‌گذاری' />
      <CardContent>
        <CustomTextField
          fullWidth
          label='قیمت پایه'
          placeholder='۵۰۰,۰۰۰ تومان'
          type='number'
          className='mbe-6'
          {...register('basePrice')}
          error={!!errors.basePrice}
          helperText={errors.basePrice?.message?.toString()}
        />

        <CustomTextField
          fullWidth
          label='قیمت با تخفیف'
          placeholder='۴۹۹,۰۰۰ تومان'
          type='number'
          className='mbe-6'
          {...register('salePrice')}
          error={!!errors.salePrice}
          helperText={errors.salePrice?.message?.toString()}
        />
      </CardContent>
    </Card>
  )
}

export default ProductPricing
