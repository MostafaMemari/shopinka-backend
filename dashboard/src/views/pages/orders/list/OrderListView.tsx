'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'

import LoadingSpinner from '@/components/LoadingSpinner'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import DesktopOrderTable from './DesktopOrderTable'
import { Order } from '@/types/app/order.type'
import EmptyOrderState from './EmptyOrderState'
import { useOrders } from '@/hooks/reactQuery/useOrder'

const OrderListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useOrders({
    enabled: true,
    params: {
      page,
      take: size,
      includeAddress: true,
      includeTransaction: true,
      includeShippingInfo: true,
      name: search ?? undefined
    },
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const orders: Order[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <div></div>

        <CustomTextField id='form-props-search' placeholder='جستجوی محصول' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : orders.length === 0 ? (
        <EmptyOrderState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          {!isMobile && <DesktopOrderTable orders={orders} refetch={refetch} />}
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={orders.length}
          />
        </>
      )}
    </Card>
  )
}

export default OrderListView
