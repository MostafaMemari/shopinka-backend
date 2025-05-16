'use client'

import { useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopShippingTable from './DesktopShippingTable'
import CreateShippingModal from './CreateShippingModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyShippingState from './EmptyShippingState'
import { useShippings } from '@/hooks/reactQuery/useShipping'
import { Shipping } from '@/types/app/shipping.type'

const ShippingView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useShippings({
    enabled: true,
    params: {
      page,
      take: size
    },
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const shippings: Shipping[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (shippings.length === 0) return <EmptyShippingState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateShippingModal />
      </Box>
      {<DesktopShippingTable data={shippings} />}
      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={shippings.length}
      />
    </Card>
  )
}

export default ShippingView
