'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import { ProductVariant } from '@/types/app/productVariant.type'

interface Props {
  variant: ProductVariant
  onUpdate: (fields: Partial<ProductVariant>) => void
}

const VariantInformation = ({ variant, onUpdate }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        اطلاعات متغیر
      </Typography>
      <Grid container spacing={6} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField fullWidth label='کد SKU' placeholder='FXSK123U-YELLOW-10CM' value={variant.sku} onChange={e => onUpdate({ sku: e.target.value })} />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Typography sx={{ mb: 2 }}>توضیحات کوتاه (اختیاری)</Typography>
          <CustomTextField
            fullWidth
            multiline
            rows={2}
            placeholder='توضیحات کوتاه متغیر'
            value={variant.shortDescription}
            onChange={e => onUpdate({ shortDescription: e.target.value })}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantInformation
