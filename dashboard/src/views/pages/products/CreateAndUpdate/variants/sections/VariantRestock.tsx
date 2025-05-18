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

const VariantRestock = ({ variant, onUpdate }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        موجودی
      </Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField fullWidth label='تعداد' placeholder='۵۴' type='number' value={variant.quantity} onChange={e => onUpdate({ quantity: Number(e.target.value) })} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField fullWidth label='وزن (کیلوگرم)' placeholder='۰.۵' type='number' value={variant.weight} onChange={e => onUpdate({ weight: Number(e.target.value) })} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField fullWidth label='عرض (سانتی‌متر)' placeholder='۱۰' type='number' value={variant.width} onChange={e => onUpdate({ width: Number(e.target.value) })} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            label='ارتفاع (سانتی‌متر)'
            placeholder='۱۵'
            type='number'
            value={variant.height}
            onChange={e => onUpdate({ height: Number(e.target.value) })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField fullWidth label='طول (سانتی‌متر)' placeholder='۲۰' type='number' value={variant.length} onChange={e => onUpdate({ length: Number(e.target.value) })} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantRestock
