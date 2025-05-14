'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopProductTable from './DesktopProductTable'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { useProducts } from '@/hooks/reactQuery/useProduct'
import { Product } from '@/types/app/product'

// Hook Import
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyProductState from './EmptyProductState'

const ProductListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useProducts({
    enabled: true,
    params: {
      page,
      take: size,
      includeMainImage: true
    },
    staleTime: 5 * 60 * 1000
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const products: Product[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (products.length === 0) return <EmptyProductState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت محصول جدید
        </Button>
      </Box>
      {!isMobile && <DesktopProductTable products={products} />}

      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={products.length}
      />
    </Card>
  )
}

export default ProductListView
