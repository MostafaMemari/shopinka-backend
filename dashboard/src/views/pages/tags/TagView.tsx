'use client'

import { useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopTagTable from './DesktopTagTable'
import CreateTagModal from './CreateTagModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useTags } from '@/hooks/reactQuery/useTag'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyTagState from './EmptyTagState'
import { Tag } from '@/types/app/tag.type'

const TagsView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useTags({
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

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (tags.length === 0) return <EmptyTagState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateTagModal />
      </Box>
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
    </Card>
  )
}

export default TagsView
