'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Component Imports
import { Button } from '@mui/material'
import ModalGallery from '@/components/Gallery/ModalGallery'
import { GalleryItem } from '@/types/gallery'

const ProductMainImage = () => {
  const handleSelect = (item: GalleryItem | GalleryItem[]) => {
    console.log('آیتم‌های انتخاب‌شده:', item)
  }

  return (
    <Card>
      <CardHeader title='تصویر محصول' />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ModalGallery btnLabel='انتخاب تصویر' onSelect={handleSelect} />
      </CardContent>
    </Card>
  )
}

export default ProductMainImage
