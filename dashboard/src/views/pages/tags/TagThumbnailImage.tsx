'use client'

import { useState, useEffect } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import { Typography, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { TagForm, Tag } from '@/types/app/tag.type'
import { GalleryItem } from '@/types/app/gallery.type'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import ImagePlaceholder from '@/components/EmptyPlaceholder'

interface TagThumbnailImageProps {
  control: Control<TagForm>
  errors: FieldErrors<TagForm>
  isLoading: boolean
  setValue: (name: keyof TagForm, value: number | null, options?: { shouldValidate?: boolean }) => void
  tag?: Tag
}

const TagThumbnailImage = ({ control, errors, isLoading, setValue, tag }: TagThumbnailImageProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (tag?.thumbnailImageId && tag?.thumbnailImage) {
      setSelectedImage({
        id: tag.thumbnailImageId,
        galleryId: 0,
        title: 'Thumbnail',
        description: null,
        fileUrl: tag.thumbnailImage.fileUrl,
        fileKey: '',
        thumbnailUrl: tag.thumbnailImage.fileUrl,
        thumbnailKey: '',
        mimetype: 'image/jpeg',
        size: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        isDeleted: false
      })
      setValue('thumbnailImageId', tag.thumbnailImageId, { shouldValidate: true })
    }
  }, [tag, setValue])

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

export default TagThumbnailImage
