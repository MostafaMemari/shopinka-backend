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
import DesktopCategoryTable from './DesktopCategoryTable'
import CreateCategoryModal from './CreateCategoryModal'
import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { CategoryOutlined } from '@mui/icons-material'
import { useCategories } from '@/hooks/reactQuery/useCategory'

const CategoryView = () => {
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
  const { data, isLoading, isFetching, error, refetch } = useCategories({
    enabled: true,
    params: {
      page,
      take: size,
      includeThumbnailImage: true,
      includeChildren: true,
      childrenDepth: 6
    },
    staleTime: 5 * 60 * 1000 // Cache data for 5 minutes
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Extract items from response
  const categories = data?.data?.items || []
  const paginationData = data?.data?.pager || { totalPages: 1, totalCount: 0 }

  // Debug logging to track issues
  useEffect(() => {
    console.log('Categories:', categories)
    console.log('Pagination Data:', paginationData)
    console.log('Error:', error)
    console.log('isLoading:', isLoading, 'isFetching:', isFetching)
  }, [categories, paginationData, error, isLoading, isFetching])

  // Handle loading state
  if (isLoading || isFetching) {
    return <LoadingSpinner />
  }

  // Handle error state
  if (error) {
    return (
      <EmptyState
        title='خطا در بارگذاری دسته‌بندی‌ها'
        subtitle='مشکلی در دریافت داده‌ها رخ داده است. لطفاً دوباره تلاش کنید.'
        icon={<CategoryOutlined color='error' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <Button variant='contained' onClick={() => refetch()}>
          تلاش دوباره
        </Button>
      </EmptyState>
    )
  }

  // Handle empty state
  if (categories.length === 0) {
    return (
      <EmptyState
        title='هیچ دسته‌بندی یافت نشد'
        subtitle='به نظر می‌رسه هیچ دسته‌بندی در این بخش وجود نداره. می‌تونید دسته‌بندی جدید ایجاد کنید!'
        icon={<CategoryOutlined color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
      >
        <CreateCategoryModal>
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            ثبت دسته‌بندی جدید
          </Button>
        </CreateCategoryModal>
      </EmptyState>
    )
  }

  // Main render
  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateCategoryModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت دسته‌بندی جدید
          </Button>
        </CreateCategoryModal>
      </Box>
      {!isMobile && <DesktopCategoryTable categories={categories} />}

      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={categories.length}
      />
    </Card>
  )
}

export default CategoryView
