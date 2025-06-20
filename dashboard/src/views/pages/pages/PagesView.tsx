'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import LoadingSpinner from '@/components/LoadingSpinner'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import { usePages } from '@/hooks/reactQuery/usePage'
import { Page } from '@/types/app/page.type'
import CreatePageModal from './CreatePageModal'
import EmptyPageState from './EmptyPageState'
import DesktopPageTable from './DesktopPageTable'

const PageListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = usePages({
    enabled: true,
    params: {
      page,
      take: size,
      name: search ?? undefined
    },
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const pages: Page[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreatePageModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت برگه جدید
          </Button>
        </CreatePageModal>

        <CustomTextField id='form-props-search' placeholder='جستجوی تگ' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : pages.length === 0 ? (
        <EmptyPageState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          {!isMobile && <DesktopPageTable pages={pages} />}
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={pages.length}
          />
        </>
      )}
    </Card>
  )
}

export default PageListView
