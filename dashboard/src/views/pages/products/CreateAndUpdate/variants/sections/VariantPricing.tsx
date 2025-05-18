'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { ProductVariant } from '@/types/app/productVariant.type'

interface Props {
  variant: ProductVariant
  onUpdate: (fields: Partial<ProductVariant>) => void
}

const VariantPricing = ({ variant, onUpdate }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        قیمت‌گذاری
      </Typography>
      <CustomTextField
        fullWidth
        label='قیمت پایه'
        placeholder='۵۰۰,۰۰۰ تومان'
        type='number'
        sx={{ mb: 6 }}
        value={variant?.basePrice}
        onChange={e => onUpdate({ basePrice: e.target.value })}
      />
      <CustomTextField
        fullWidth
        label='قیمت با تخفیف'
        placeholder='۴۹۹,۰۰۰ تومان'
        type='number'
        value={variant.salePrice}
        onChange={e => onUpdate({ salePrice: e.target.value })}
      />
    </Box>
  )
}

export default VariantPricing
