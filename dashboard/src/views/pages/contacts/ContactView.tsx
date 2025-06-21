'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, Box, useMediaQuery, useTheme } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearch } from '@/hooks/useSearchQuery'
import EmptyContactState from './EmptyContactState'
import DesktopContactTable from './DesktopContactTable'
import { Contact } from '@/types/app/contact.type'
import { useContacts } from '@/hooks/reactQuery/useContact'

const ContactView = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debouncedSearch = useDebounce(inputValue, 500)

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useContacts({
    enabled: true,
    params: {
      page,
      take: size
    },
    staleTime: 60 * 1000
  })

  const contacts: Contact[] = useMemo(() => data?.data?.items || [], [data])

  const pager = useMemo(
    () =>
      data?.data?.pager || {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
      },
    [data]
  )

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 6 }}>
        <CustomTextField id='form-props-search' placeholder='جستجوی پیام تماس' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} sx={{ width: 300 }} />
      </Box>

      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : contacts.length === 0 ? (
        <EmptyContactState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          {!isMobile && <DesktopContactTable contacts={contacts} />}
          <TablePaginationComponent
            currentPage={pager.currentPage}
            totalPages={pager.totalPages}
            totalCount={pager.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={contacts.length}
          />
        </>
      )}
    </Card>
  )
}

export default ContactView
