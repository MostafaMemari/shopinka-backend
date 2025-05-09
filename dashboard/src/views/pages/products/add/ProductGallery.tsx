'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import ModalGallery from '@/components/Gallery/ModalGallery'
import { type GalleryItem } from '@/types/gallery'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const ProductGallery = () => {
  const [selectedImages, setSelectedImages] = useState<GalleryItem[]>([])

  const handleSelect = (items: GalleryItem | GalleryItem[]) => {
    const newItems = Array.isArray(items) ? items : [items]

    setSelectedImages(newItems)
  }

  const handleRemove = (id: number) => {
    setSelectedImages(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader title='گالری تصاویر محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {selectedImages.map(item => (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 1
              }}
            >
              <Image src={item.fileUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
              <Tooltip title='حذف تصویر'>
                <IconButton
                  size='small'
                  color='error'
                  onClick={() => handleRemove(item.id)}
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
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ModalGallery btnLabel='انتخاب تصاویر' multi initialSelected={selectedImages} onSelect={handleSelect} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductGallery
