'use client'

import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import { type ProductVariantForm } from '@/types/app/productVariant.type'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantRestock = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        موجودی
      </Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='quantity'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='تعداد'
                placeholder='۵۴'
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='weight'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='وزن (کیلوگرم)'
                placeholder='۰.۵'
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name='width'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='عرض (سانتی‌متر)'
                placeholder='۱۰'
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors.width}
                helperText={errors.width?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name='height'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='ارتفاع (سانتی‌متر)'
                placeholder='۱۵'
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors.height}
                helperText={errors.height?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name='length'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='طول (سانتی‌متر)'
                placeholder='۲۰'
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                error={!!errors.length}
                helperText={errors.length?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantRestock
