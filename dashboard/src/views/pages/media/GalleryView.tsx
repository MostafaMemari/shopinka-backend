'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'

// Next.js Imports
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import MobileGalleryCard from './MobileGalleryCard'
import DesktopGalleryTable from './DesktopGalleryTable'
import CreateGalleryModal from './CreateGalleryModal'
import EmptyState from '@/components/states/EmptyState'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { PermMedia } from '@mui/icons-material'
import { useGallery } from '@/hooks/reactQuery/useGallery'

const GalleryView = () => {
  // Hooks for query string
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize page and rowsPerPage from query string
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const initialRowsPerPage = parseInt(searchParams.get('size') || '10', 10)

  // States
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialRowsPerPage)

  // Update query string when page or rowsPerPage changes
  useEffect(() => {
    const currentPage = searchParams.get('page') || '1'
    const currentSize = searchParams.get('size') || '10'

    // Only update URL if page or size has actually changed
    if (page.toString() !== currentPage || size.toString() !== currentSize) {
      const params = new URLSearchParams()

      if (page !== 1) params.set('page', page.toString())
      if (size !== 10) params.set('size', size.toString())
      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [page, size, pathname, router, searchParams])

  // Query Hook
  const { data, isLoading, isFetching, error, refetch } = useGallery({
    enabled: true,
    params: {
      page,
      take: size
    },
    staleTime: 5 * 60 * 1000 // Cache data for 5 minutes
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Extract items from response
  const galleries = data?.data?.items || []
  const paginationData = data?.data?.pager || { totalPages: 1, totalCount: 0 }

  // Debug logging to track issues
  useEffect(() => {
    console.log('Galleries:', galleries)
    console.log('Pagination Data:', paginationData)
    console.log('Error:', error)
    console.log('isLoading:', isLoading, 'isFetching:', isFetching)
  }, [galleries, paginationData, error, isLoading, isFetching])

  // Handle loading state
  if (isLoading || isFetching) {
    return <LoadingSpinner />
  }

  // Handle error state
  if (error) {
    return (
      <EmptyState
        title='خطا در بارگذاری گالری‌ها'
        subtitle='مشکلی در دریافت داده‌ها رخ داده است. لطفاً دوباره تلاش کنید.'
        icon={<PermMedia color='error' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <Button onClick={() => refetch()} variant='contained'>
          تلاش دوباره
        </Button>
      </EmptyState>
    )
  }

  // Handle empty state
  if (galleries.length === 0) {
    return (
      <EmptyState
        title='هیچ گالری‌ای یافت نشد'
        subtitle='به نظر می‌رسه هیچ گالری‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
        icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <CreateGalleryModal>
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            آپلود رسانه جدید
          </Button>
        </CreateGalleryModal>
      </EmptyState>
    )
  }

  // Main render
  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateGalleryModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            آپلود رسانه جدید
          </Button>
        </CreateGalleryModal>
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
