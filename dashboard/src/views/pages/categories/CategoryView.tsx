'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopCategoryTable from './DesktopCategoryTable'
import CreateCategoryModal from './CreateCategoryModal'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { useCategories } from '@/hooks/reactQuery/useCategory'
import { Category } from '@/types/app/category'

// Hook Import
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyCategoryState from './EmptyCategoryState'

const CategoryView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useCategories({
    enabled: true,
    params: {
      page,
      take: size,
      includeThumbnailImage: true,
      includeChildren: true,
      childrenDepth: 6
    },
    staleTime: 5 * 60 * 1000
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const categories: Category[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (categories.length === 0) return <EmptyCategoryState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateCategoryModal />
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
