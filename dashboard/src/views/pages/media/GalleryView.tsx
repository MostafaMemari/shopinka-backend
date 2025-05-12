'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import MobileGalleryCard from './MobileGalleryCard'
import DesktopGalleryTable from './DesktopGalleryTable'
import CreateGalleryModal from './CreateGalleryModal'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { useGallery } from '@/hooks/reactQuery/useGallery'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { Gallery } from '@/types/gallery'
import ErrorState from '@/components/states/ErrorState'
import EmptyGalleryState from './EmptyGalleryState'

const GalleryView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useGallery({
    enabled: true,
    params: {
      page,
      take: size
    },
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const galleries: Gallery[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (galleries.length === 0) return <EmptyGalleryState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateGalleryModal />
      </Box>
      {isMobile ? <MobileGalleryCard data={galleries} /> : <DesktopGalleryTable data={galleries} />}
      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={galleries.length}
      />
    </Card>
  )
}

export default GalleryView
