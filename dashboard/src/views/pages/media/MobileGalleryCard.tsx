'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Box, CardContent, Chip } from '@mui/material'

// Component Imports

// API Import
import { Gallery } from '@/types/gallery'

const MobileGalleryCard = ({ data, paginatedData }: { data: Gallery[]; paginatedData: Gallery[] }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
    {paginatedData.length === 0 ? (
      <Typography textAlign='center' color='text.secondary'>
        داده‌ای موجود نیست
      </Typography>
    ) : (
      paginatedData.map(row => (
        <Card
          key={row.id}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover'
            },
            transition: 'background-color 0.2s'
          }}
        >
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}></CardContent>
        </Card>
      ))
    )}
  </Box>
)

export default MobileGalleryCard
