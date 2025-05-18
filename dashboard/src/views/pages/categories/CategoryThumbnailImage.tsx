'use client'

import { useState, useEffect } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import { Typography, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { GalleryItem } from '@/types/app/gallery.type'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import ImagePlaceholder from '@/components/EmptyPlaceholder'
import { Category } from '@/types/app/category.type'
import { CategoryForm } from '@/libs/validators/category.schema'

interface CategoryThumbnailImageProps {
  control: Control<CategoryForm>
  errors: FieldErrors<CategoryForm>
  isLoading: boolean
  setValue: (name: keyof CategoryForm, value: number | null, options?: { shouldValidate?: boolean }) => void
  category?: Category
}

const CategoryThumbnailImage = ({ control, errors, isLoading, setValue, category }: CategoryThumbnailImageProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (category?.thumbnailImageId && category?.thumbnailImage) {
      setSelectedImage({
        id: category.thumbnailImageId,
        galleryId: 0,
        title: 'Thumbnail',
        description: null,
        fileUrl: category.thumbnailImage.fileUrl,
        fileKey: '',
        thumbnailUrl: category.thumbnailImage.fileUrl,
        thumbnailKey: '',
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
      render={() => (
        <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
          <Typography variant='body2' sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            تصویر بندانگشتی (اختیاری)
          </Typography>

          <Box sx={{ position: 'relative', width: 120, height: 120 }}>
            {selectedImage ? (
              <>
                <Image src={selectedImage.fileUrl} alt={selectedImage.title} fill style={{ objectFit: 'cover', borderRadius: 8 }} />
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
                      '&:hover': { bgcolor: 'rgba(255,0,0,0.1)' }
                    }}
                  >
                    <DeleteOutlineIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <ImagePlaceholder width={120} height={120} />
            )}
          </Box>

          <ModalGallery initialSelected={selectedImage || undefined} multi={false} onSelect={handleSelect}>
            <Button variant='outlined' color='primary' fullWidth>
              {selectedImage ? 'تغییر تصویر بندانگشتی' : 'انتخاب تصویر بندانگشتی'}
            </Button>
          </ModalGallery>

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
