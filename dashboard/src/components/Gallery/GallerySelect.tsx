'use client'

import { CircularProgress, MenuItem, type SelectChangeEvent, type SxProps, type Theme } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { Gallery } from '@/types/app/gallery.type'
import { ReactNode } from 'react'
import { useGallery } from '@/hooks/reactQuery/useGallery'

interface GallerySelectProps {
  value: string
  onChange: (event: SelectChangeEvent<string>) => void
  search?: string
  enabled?: boolean
  sx?: SxProps<Theme>
  showAllOption?: boolean
}

const GallerySelect = ({ value, onChange, enabled = true, sx, showAllOption = false }: GallerySelectProps) => {
  const {
    data: galleriesData,
    isLoading: isLoadingGalleries,
    isFetching: isFetchingGalleries,
    error: errorGalleries
  } = useGallery({
    enabled,
    staleTime: 5 * 60 * 1000
  })

  const galleries: Gallery[] = galleriesData?.data?.items || []

  return (
    <CustomTextField
      select
      fullWidth
      value={value}
      id='gallery-select'
      sx={{ flex: { xs: '1 1 100%', sm: '1 1 200px' }, maxWidth: { sm: 200 }, ...sx }}
      slotProps={{
        select: {
          displayEmpty: true,
          onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => {
            onChange(event as SelectChangeEvent<string>)
          },
          renderValue: selected => {
            if (!selected) return 'انتخاب گالری'

            return selected === 'all' && showAllOption ? 'همه گالری‌ها' : galleries.find(g => g.id === selected)?.title || 'انتخاب گالری'
          }
        }
      }}
    >
      {showAllOption && <MenuItem value='all'>همه گالری‌ها</MenuItem>}
      {isLoadingGalleries || isFetchingGalleries ? (
        <MenuItem disabled>
          <CircularProgress size={20} />
        </MenuItem>
      ) : errorGalleries ? (
        <MenuItem disabled>خطا در بارگذاری گالری‌ها</MenuItem>
      ) : galleries.length === 0 ? (
        <MenuItem disabled>هیچ گالری یافت نشد</MenuItem>
      ) : (
        galleries.map(gallery => (
          <MenuItem key={gallery.id} value={gallery.id}>
            {gallery.title}
          </MenuItem>
        ))
      )}
    </CustomTextField>
  )
}

export default GallerySelect
