'use client'

import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { type ProductVariantForm } from '@/types/app/productVariant.type'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantPricing = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        قیمت‌گذاری
      </Typography>
      <Controller
        name='basePrice'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='قیمت پایه'
            placeholder='۵۰۰,۰۰۰ تومان'
            type='number'
            sx={{ mb: 6 }}
            value={field.value ?? ''}
            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
            error={!!errors.basePrice}
            helperText={errors.basePrice?.message}
          />
        )}
      />
      <Controller
        name='salePrice'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='قیمت با تخفیف'
            placeholder='۴۹۹,۰۰۰ تومان'
            type='number'
            value={field.value ?? ''}
            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
            error={!!errors.salePrice}
            helperText={errors.salePrice?.message}
          />
        )}
      />
    </Box>
  )
}

export default VariantPricing
