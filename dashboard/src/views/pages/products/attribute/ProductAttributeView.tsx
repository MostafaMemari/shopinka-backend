'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateAttributeModal from './CreateAttributeModal'
import { Attribute } from '@/types/app/productAttributes.type'
import DesktopAttributeTable from './DesktopAttributeTable'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import EmptyAttributeState from './EmptyAttributeState'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'

const ProductAttributeView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

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

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateAttributeModal />

        <CustomTextField id='form-props-search' placeholder='جستجوی ویژگی' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {attributes.length === 0 ? (
        <EmptyAttributeState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
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
        </>
      )}
    </Card>
  )
}

export default ProductAttributeView
