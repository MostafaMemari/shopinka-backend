'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Component Imports
import ModalGallery from '@/components/Gallery/ModalGallery'
import { type GalleryItem } from '@/types/gallery'

const ProductGallery: React.FC = () => {
  const handleSelect = (item: GalleryItem | GalleryItem[]) => {
    console.log('آیتم‌های انتخاب‌شده:', item)
  }

  return (
    <Card>
      <CardHeader title='گالری محصول' />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ModalGallery btnLabel='انتخاب تصاویر' multi onSelect={handleSelect} />
      </CardContent>
    </Card>
  )
}

export default ProductGallery
