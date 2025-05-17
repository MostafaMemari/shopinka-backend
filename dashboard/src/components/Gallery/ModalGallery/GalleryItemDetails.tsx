import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { GalleryItem } from '@/types/app/gallery.type'

interface Props {
  activeItem: GalleryItem | null
  setActiveItem: (item: GalleryItem | null) => void
  multi: boolean
  selectedItems: GalleryItem[]
}

const GalleryItemDetails = ({ activeItem, setActiveItem, multi, selectedItems }: Props) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 300 },
        borderLeft: '1px solid',
        borderColor: 'divider',
        p: { xs: 2, sm: 4 },
        overflowY: 'auto',
        maxHeight: '100%',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant='h6'>جزئیات تصویر</Typography>
      {activeItem ? (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label='عنوان' value={activeItem.title} onChange={e => setActiveItem({ ...activeItem, title: e.target.value })} fullWidth />
          <TextField
            label='توضیحات'
            value={activeItem.description || ''}
            onChange={e => setActiveItem({ ...activeItem, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
          <Typography variant='body2'>
            <strong>شناسه:</strong> {activeItem.id}
          </Typography>
          <Typography variant='body2'>
            <strong>تاریخ ایجاد:</strong> {new Date(activeItem.createdAt).toLocaleDateString('fa-IR')}
          </Typography>
          <Typography variant='body2'>
            <strong>حجم:</strong> {(activeItem.size / 1024).toFixed(2)} KB
          </Typography>
          <Typography variant='body2'>
            <strong>نوع فایل:</strong> {activeItem.mimetype}
          </Typography>
          <Typography variant='body2'>
            <strong>آدرس فایل:</strong>{' '}
            <a href={activeItem.fileUrl} target='_blank' rel='noopener noreferrer'>
              لینک
            </a>
          </Typography>
        </Box>
      ) : (
        <Typography variant='body2' sx={{ mt: 2 }}>
          هیچ آیتمی انتخاب نشده است
        </Typography>
      )}
      {multi && selectedItems.length > 0 && (
        <Typography variant='body2' sx={{ mt: 2 }}>
          {selectedItems.length} تصویر انتخاب شده
        </Typography>
      )}
    </Box>
  )
}

export default GalleryItemDetails
