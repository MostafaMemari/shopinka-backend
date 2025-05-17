'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopCommentTable from './DesktopCommentTable'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { useComments } from '@/hooks/reactQuery/useComment'
import { Comment } from '@/types/app/comment.type'

// Hook Import
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyCommentState from './EmptyCommentState'

const CommentView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const { data, isLoading, isFetching, error, refetch } = useComments({
    enabled: true,
    params: {
      page,
      take: size,
      includeUser: true,
      includeProduct: true
    },
    staleTime: 5 * 60 * 1000
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const comments: Comment[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (comments.length === 0) return <EmptyCommentState />

  console.log(comments)

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>{/* <CreateCommentModal /> */}</Box>
      {!isMobile && <DesktopCommentTable comments={comments} />}

      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={comments.length}
      />
    </Card>
  )
}

export default CommentView
