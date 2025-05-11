'use client'

import { useState, useEffect } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import { CategoryForm, Category } from '@/types/category'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import { Typography } from '@mui/material'
import { GalleryItem } from '@/types/gallery'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

interface CategoryThumbnailImageProps {
  control: Control<CategoryForm>
  errors: FieldErrors<CategoryForm>
  isLoading: boolean
  setValue: (name: keyof CategoryForm, value: number | null, options?: { shouldValidate?: boolean }) => void
  category?: Category // Optional category prop for UpdateCategoryModal
}

const CategoryThumbnailImage = ({ control, errors, isLoading, setValue, category }: CategoryThumbnailImageProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  // Initialize selectedImage with category's thumbnail image (for UpdateCategoryModal)
  useEffect(() => {
    if (category?.thumbnailImageId && category?.thumbnailImage) {
      setSelectedImage({
        id: category.thumbnailImageId,
        galleryId: 0, // Required but not used in this context
        title: 'Thumbnail',
        description: null,
        fileUrl: category.thumbnailImage.fileUrl,
        fileKey: '',
        mimetype: 'image/jpeg',
        size: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        isDeleted: false
      })

      setValue('thumbnailImageId', category.thumbnailImageId, { shouldValidate: true })
    }
  }, [category, setValue])

  const handleSelect = (item: GalleryItem | GalleryItem[]) => {
    const image = Array.isArray(item) ? item[0] : item

    setSelectedImage(image)

    const thumbnailImageId = typeof image.id === 'number' && image.id > 0 ? image.id : null

    setValue('thumbnailImageId', thumbnailImageId, { shouldValidate: true })
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setValue('thumbnailImageId', null, { shouldValidate: true })
  }

  return (
    <Controller
      name='thumbnailImageId'
      control={control}
      render={({ field }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant='body2' sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            تصویر بندانگشتی (اختیاری)
          </Typography>
          {selectedImage && (
            <Box sx={{ position: 'relative', width: 120, height: 120, borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
              <Image src={selectedImage.fileUrl} alt={selectedImage.title} fill style={{ objectFit: 'cover' }} />
              <Tooltip title='حذف تصویر'>
                <IconButton
                  size='small'
                  color='error'
                  onClick={handleRemove}
                  disabled={isLoading}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' }
                  }}
                >
                  <DeleteOutlineIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <Box>
            <ModalGallery initialSelected={selectedImage || undefined} btnLabel={selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} multi={false} onSelect={handleSelect} />
          </Box>
          {errors.thumbnailImageId && (
            <Typography variant='caption' color='error' id='thumbnailImageId-error'>
              {errors.thumbnailImageId.message}
            </Typography>
          )}
        </Box>
      )}
    />
  )
}

export default CategoryThumbnailImage
