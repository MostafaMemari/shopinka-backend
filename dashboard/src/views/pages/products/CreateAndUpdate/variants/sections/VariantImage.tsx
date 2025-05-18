'use client'

import { type Control, Controller, type UseFormSetValue } from 'react-hook-form'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { Typography } from '@mui/material'

interface Props {
  variant: ProductVariant
  control: Control<ProductVariantForm>
  setValue: UseFormSetValue<ProductVariantForm>
}

const VariantImage = ({ variant, control, setValue }: Props) => {
  const handleSelectImage = (items: any) => {
    const image = Array.isArray(items) ? items[0] : items

    if (image) {
      setValue('mainImageId', image.id || null, { shouldValidate: true })
    }
  }

  const handleRemoveImage = () => {
    setValue('mainImageId', null, { shouldValidate: true })
  }

  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        تصویر متغیر
      </Typography>
      <Controller
        name='mainImageId'
        control={control}
        render={({ field }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {variant.mainImage && variant.mainImage.fileUrl ? (
              <Box sx={{ position: 'relative', width: 200, height: 200, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                <Image src={variant.mainImage.fileUrl} alt={variant.mainImage.title || 'تصویر متغیر'} fill style={{ objectFit: 'cover' }} />
                <Tooltip title='حذف تصویر'>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.8)',
                      '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' }
                    }}
                  >
                    <DeleteOutlineIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <EmptyPlaceholder text='تصویری یافت نشد' width={200} height={200} />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <ModalGallery
                initialSelected={variant.mainImage || undefined}
                btnLabel={variant.mainImage ? 'تغییر تصویر' : 'انتخاب تصویر'}
                multi={false}
                onSelect={handleSelectImage}
              >
                <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  {variant.mainImage ? 'تغییر تصویر' : 'انتخاب تصویر'} از گالری
                </Typography>
              </ModalGallery>
            </Box>
          </Box>
        )}
      />
    </Box>
  )
}

export default VariantImage
