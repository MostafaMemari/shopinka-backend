'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

// Component Imports
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import { GalleryItem } from '@/types/gallery'
import { useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

const ProductMainImage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext()

  const handleSelect = (item: GalleryItem | GalleryItem[]) => {
    const image = Array.isArray(item) ? item[0] : item

    setSelectedImage(image)

    const mainImageId = typeof image.id === 'number' && image.id > 0 ? image.id : undefined

    setValue('mainImageId', mainImageId)
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setValue('mainImageId', undefined)
  }

  return (
    <Card>
      <CardHeader title='تصویر اصلی محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {selectedImage && (
          <Box sx={{ position: 'relative', width: 200, height: 200, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <Image src={selectedImage.fileUrl} alt={selectedImage.title} fill style={{ objectFit: 'cover' }} />
            <Tooltip title='حذف تصویر'>
              <IconButton
                size='small'
                color='error'
                onClick={handleRemove}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255,0,0,0.15)'
                  }
                }}
              >
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ModalGallery initialSelected={selectedImage || undefined} btnLabel={selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} multi={false} onSelect={handleSelect} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductMainImage
