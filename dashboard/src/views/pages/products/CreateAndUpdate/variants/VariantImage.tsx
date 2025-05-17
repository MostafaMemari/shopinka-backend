'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { ProductVariant } from '@/types/app/productVariant.type'

interface Props {
  variant: ProductVariant
  onUpdate: (fields: Partial<ProductVariant>) => void
}

const VariantImage = ({ variant, onUpdate }: Props) => {
  const handleSelectImage = (image: { fileUrl: string; title?: string }) => {
    onUpdate({ image })
  }

  const handleRemoveImage = () => {
    onUpdate({ image: undefined })
  }

  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        تصویر متغیر
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {variant.mainImageId ? (
          <Box sx={{ position: 'relative', width: 200, height: 200, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <Image src={variant?.mainImage?.fileUrl ?? ''} alt={variant?.mainImage?.title || 'تصویر متغیر'} fill style={{ objectFit: 'cover' }} />
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
          <ModalGallery initialSelected={variant.image || undefined} btnLabel={variant.image ? 'تغییر تصویر' : 'انتخاب تصویر'} multi={false} onSelect={handleSelectImage}>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              {variant.image ? 'تغییر تصویر' : 'انتخاب تصویر'} از گالری
            </Typography>
          </ModalGallery>
        </Box>
      </Box>
    </Box>
  )
}

export default VariantImage
