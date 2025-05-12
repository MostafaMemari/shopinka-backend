'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'

// Next.js Imports
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopMediaGallery from './DesktopMediaGallery'
import CreateMediaModal from './CreateMediaModal'
import RemoveGalleryItemModal from './RemoveMediaModal'
import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { PermMedia } from '@mui/icons-material'
import { useGalleryItems } from '@/hooks/reactQuery/useGallery'
import { GalleryItem } from '@/types/gallery'
import { number } from 'yup'

const GalleryItemView = ({ galleryId }: { galleryId: string }) => {
  // Hooks for query string
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Memoize searchParams values to prevent unnecessary re-renders
  const pageParam = useMemo(() => searchParams.get('page') || '1', [searchParams])
  const sizeParam = useMemo(() => searchParams.get('size') || '10', [searchParams])

  // Initialize page and rowsPerPage from query string
  const initialPage = parseInt(pageParam, 10) - 1 // Start from 0 for internal state
  const initialRowsPerPage = parseInt(sizeParam, 10)

  // States
  const [page, setPage] = useState(initialPage)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [selected, setSelected] = useState<string[]>([])

  // Update query string when page or rowsPerPage changes
  useEffect(() => {
    const currentPage = (parseInt(pageParam, 10) - 1).toString()
    const currentSize = sizeParam

    // Only update URL if page or size has actually changed
    if (page.toString() !== currentPage || rowsPerPage.toString() !== currentSize) {
      const params = new URLSearchParams()

      if (page + 1 !== 1) params.set('page', (page + 1).toString())
      if (rowsPerPage !== 10) params.set('size', rowsPerPage.toString())
      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [page, rowsPerPage, pathname, router, pageParam, sizeParam])

  // Query Hook
  const { data, isLoading, isFetching, error, refetch } = useGalleryItems({
    params: {
      galleryId,
      page: page + 1, // API expects 1-based page
      take: rowsPerPage
    },
    enabled: !!galleryId, // Only fetch if galleryId is valid
    staleTime: 5 * 60 * 1000 // Cache data for 5 minutes
  })

  // Extract items from response with safe fallback
  const galleryItems: GalleryItem[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  // Clear invalid selections when page or items change
  useEffect(() => {
    const validIds = galleryItems.map(item => item.id)

    setSelected(prev => {
      const newSelected = prev.filter(id => validIds.includes(Number(id)))

      return newSelected.length === prev.length ? prev : newSelected
    })
  }, [galleryItems])

  // Debug logging to track issues
  useEffect(() => {
    console.log('Gallery Items:', galleryItems)
    console.log('Pagination Data:', paginationData)
    console.log('Error:', error)
    console.log('isLoading:', isLoading, 'isFetching:', isFetching)
    console.log('Selected:', selected)
    console.log('Page:', page, 'RowsPerPage:', rowsPerPage)
  }, [galleryItems, paginationData, error, isLoading, isFetching, selected, page, rowsPerPage])

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  // Handle clear selection
  const handleClearSelection = () => {
    setSelected([])
  }

  // Handle loading state
  if (isLoading || isFetching) {
    return <LoadingSpinner />
  }

  // Handle error state
  if (error) {
    return (
      <EmptyState
        title='خطا در بارگذاری رسانه‌ها'
        subtitle='مشکلی در دریافت داده‌ها رخ داده است. لطفاً دوباره تلاش کنید.'
        icon={<PermMedia color='error' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <Button variant='contained' onClick={() => refetch()}>
          تلاش دوباره
        </Button>
      </EmptyState>
    )
  }

  // Handle empty state
  if (galleryItems.length === 0) {
    return (
      <EmptyState
        title='هیچ رسانه‌ای یافت نشد'
        subtitle='به نظر می‌رسه هیچ رسانه‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
        icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <CreateMediaModal>
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            آپلود رسانه جدید
          </Button>
        </CreateMediaModal>
      </EmptyState>
    )
  }

  // Main render
  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CreateMediaModal>
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>
              آپلود رسانه جدید
            </Button>
          </CreateMediaModal>
          {selected.length > 0 && <RemoveGalleryItemModal selectedImages={selected} onClearSelection={handleClearSelection} />}
        </Box>
      </Box>
      <DesktopMediaGallery data={galleryItems} selected={selected} handleCheckboxChange={handleCheckboxChange} />
      <TablePaginationComponent
        currentPage={page + 1} // Display 1-based page
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={rowsPerPage}
        onPageChange={newPage => setPage(newPage - 1)} // Convert to 0-based
        onRowsPerPageChange={setRowsPerPage}
        currentPageItemCount={galleryItems.length}
      />
    </Card>
  )
}

export default GalleryItemView
