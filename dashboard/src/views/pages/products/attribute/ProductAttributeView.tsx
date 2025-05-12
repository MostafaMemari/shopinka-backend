'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateAttributeModal from './CreateAttributeModal'

// API Import
import { Attribute } from '@/types/productAttributes'
import DesktopAttributeTable from './DesktopAttributeTable'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import EmptyAttributeState from './EmptyAttributeState'

const ProductAttributeView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useAttribute({
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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const attributes: Attribute[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (attributes.length === 0) return <EmptyAttributeState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateAttributeModal />
      </Box>
      {!isMobile && <DesktopAttributeTable data={attributes} />}
      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={attributes.length}
      />
    </Card>
  )
}

export default ProductAttributeView
