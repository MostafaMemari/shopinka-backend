import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
import { GalleryItem } from '@/types/app/gallery.type'

interface GalleryContentProps {
  galleryItems: GalleryItem[]
  isLoading: boolean
  error: any
  visibleItems: number
  selectedItems: GalleryItem[]
  onShowMore: () => void
  onItemClick: (item: GalleryItem) => void
  onRetry: () => void
}

const GalleryContent = ({ galleryItems, isLoading, error, visibleItems, selectedItems, onShowMore, onItemClick, onRetry }: GalleryContentProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 2, sm: 4 }
      }}
    >
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      )}
      {error && !isLoading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography color='error' variant='h6'>
            خطا در بارگذاری تصاویر
          </Typography>
          <Button variant='outlined' onClick={onRetry} sx={{ mt: 2 }}>
            تلاش دوباره
          </Button>
        </Box>
      )}
      {!isLoading && !error && galleryItems.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant='h6'>هیچ تصویری یافت نشد</Typography>
          <Typography variant='body2' color='text.secondary'>
            به نظر می‌رسد هیچ تصویری در این گالری وجودpenalty ندارد.
          </Typography>
        </Box>
      )}
      {!isLoading && !error && galleryItems.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: { xs: 2, sm: 4 }
          }}
        >
          {galleryItems.slice(0, visibleItems).map((item: GalleryItem) => (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                height: 150,
                border: selectedItems.some(i => i.id === item.id) ? '2px solid blue' : '1px solid',
                borderColor: selectedItems.some(i => i.id === item.id) ? 'primary.main' : 'divider',
                borderRadius: 1,
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onClick={() => onItemClick(item)}
            >
              <Image src={item.fileUrl} alt={item.title} fill style={{ objectFit: 'cover' }} sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw' />
            </Box>
          ))}
        </Box>
      )}
      {galleryItems.length > visibleItems && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant='outlined' onClick={onShowMore}>
            نمایش بیشتر
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default GalleryContent
