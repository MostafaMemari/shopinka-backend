'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopTagTable from './DesktopTagTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import { Tag } from '@/types/app/tag.type'
import { useTags } from '@/hooks/reactQuery/useTag'
import EmptyTagState from './EmptyTagState'
import CreateTagModal from './CreateTagModal'

const TagListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useTags({
    enabled: true,
    params: {
      page,
      take: size,
      includeMainImage: true,
      name: search ?? undefined
    },
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateTagModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت تگ جدید
          </Button>
        </CreateTagModal>

        <CustomTextField id='form-props-search' placeholder='جستجوی تگ' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : tags.length === 0 ? (
        <EmptyTagState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          {!isMobile && <DesktopTagTable tags={tags} />}
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={tags.length}
          />
        </>
      )}
    </Card>
  )
}

export default TagListView
