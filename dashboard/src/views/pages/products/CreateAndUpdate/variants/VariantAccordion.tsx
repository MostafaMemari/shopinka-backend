'use client'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SaveIcon from '@mui/icons-material/Save'
import VariantInformation from './sections/VariantInformation'
import VariantRestock from './sections/VariantRestock'
import VariantPricing from './sections/VariantPricing'
import VariantImage from './sections/VariantImage'
import RemoveProductVariantModal from './RemoveProductVariantModal'
import { ProductVariant } from '@/types/app/productVariant.type'
import { useProductVariantForm } from '@/hooks/reactQuery/useProductVariant'
import { useEffect } from 'react'
import { useDefaultVariant } from '@/hooks/reactQuery/useDefaultVariant'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

type VariantAccordionProps = {
  variant: ProductVariant & { isDefault?: boolean }
  isDefault: boolean
  expanded: boolean
  onChange: (id: string) => void
  onUpdate: (id: string, updatedFields: Partial<ProductVariant> & { isDefault?: boolean }) => void
}

const VariantAccordion = ({ variant, expanded, isDefault, onChange, onUpdate }: VariantAccordionProps) => {
  const { control, errors, setValue, isLoading, onSubmit } = useProductVariantForm({
    productId: Number(variant.productId),
    initialData: variant,
    isUpdate: true
  })

  const { toggleDefaultVariant, isLoading: isSettingDefault } = useDefaultVariant({
    productId: Number(variant.productId),
    variantId: Number(variant.id)
  })

  useEffect(() => {
    setValue('sku', variant.sku ?? '')
    setValue('shortDescription', variant.shortDescription ?? '')
    setValue('quantity', variant.quantity ?? null)
    setValue('basePrice', variant.basePrice ?? null)
    setValue('salePrice', variant.salePrice ?? null)
    setValue('mainImageId', variant.mainImage?.id ?? null)
    setValue('width', variant.width ?? null)
    setValue('height', variant.height ?? null)
    setValue('length', variant.length ?? null)
    setValue('weight', variant.weight ?? null)
    setValue('attributeValueIds', variant.attributeValues?.map(av => av.id) ?? [])
  }, [variant, setValue])

  return (
    <Accordion expanded={expanded} onChange={() => onChange(String(variant.id ?? ''))} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<i className='tabler-chevron-down' />} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <RemoveProductVariantModal id={Number(variant.id)}>
            <Tooltip title='حذف متغیر'>
              <IconButton size='small' color='error'>
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </RemoveProductVariantModal>
          <Tooltip title={isDefault ? 'حذف از پیش‌فرض' : 'تنظیم به‌عنوان پیش‌فرض'}>
            <span>
              <IconButton
                size='small'
                color={isDefault ? 'warning' : 'default'}
                onClick={() => toggleDefaultVariant(isDefault ?? false)}
                disabled={isSettingDefault}
                sx={{ mr: 2 }}
              >
                {isDefault ? <StarIcon fontSize='small' /> : <StarBorderIcon fontSize='small' />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title='بروزرسانی متغیر'>
            <IconButton size='small' color='primary' onClick={onSubmit} sx={{ mr: 2 }} disabled={isLoading}>
              <SaveIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Typography>{(variant.attributeValues ?? []).map(av => av.name).join(', ') || 'متغیر جدید'}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantInformation control={control} errors={errors} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantRestock control={control} errors={errors} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantPricing control={control} errors={errors} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantImage variant={variant} control={control} setValue={setValue} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default VariantAccordion
