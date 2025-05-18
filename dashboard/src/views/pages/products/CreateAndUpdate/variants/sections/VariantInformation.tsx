'use client'

import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import { ProductVariantForm } from '@/types/app/productVariant.type'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantInformation = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        اطلاعات متغیر
      </Typography>
      <Grid container spacing={6} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='sku'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='کد SKE'
                placeholder='FXSK123U-YELLOW-10CM'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value || '')}
                error={!!errors.sku}
                helperText={errors.sku?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name='shortDescription'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={2}
                placeholder='توضیحات کوتاه متغیر'
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value || '')}
                error={!!errors.shortDescription}
                helperText={errors.shortDescription?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantInformation
