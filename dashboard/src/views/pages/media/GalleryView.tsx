'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'

// API Import
import MobileGalleryCard from './MobileGalleryCard'
import DesktopGalleryTable from './DesktopGalleryTable'
import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/EmptyState'
import CreateGalleryModal from './CreateGalleryModal'
import { useGallery } from '@/hooks/reactQuery/useGallery'
import LoadingSpinner from '@/components/LoadingSpinner'

// Main Component
const GalleryView = () => {
  // States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Query Hook
  const { data, isLoading, isFetching, error, refetch } = useGallery({
    enabled: true,
    staleTime: 5 * 60 * 1000
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const galleries = data?.data?.items || []
  const paginationData = data?.data?.pager || []

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      {galleries.length === 0 ? (
        <EmptyState
          title='هیچ گالری‌ای یافت نشد'
          subtitle='به نظر می‌رسه هیچ گالری‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
          icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
        >
          <CreateGalleryModal />
        </EmptyState>
      ) : (
        <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
            <CreateGalleryModal />
          </Box>
          {isMobile ? <MobileGalleryCard data={data} /> : <DesktopGalleryTable data={galleries} />}
          <TablePaginationComponent
            currentPage={paginationData?.currentPage || 1}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.totalCount || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            currentPageItemCount={galleries.length}
          />{' '}
        </Card>
      )}
    </>
  )
}

export default GalleryView
