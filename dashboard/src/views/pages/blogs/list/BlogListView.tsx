'use client'

import { useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopBlogTable from './DesktopBlogTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Blog } from '@/types/app/blog.type'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyBlogState from './EmptyBlogState'
import { useBlogs } from '@/hooks/reactQuery/useBlog'
import { useRouter } from 'next/navigation'

const BlogListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const router = useRouter()

  const handleAddProduct = () => {
    router.push('/blogs/add')
  }

  const { data, isLoading, isFetching, error, refetch } = useBlogs({
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

  const blogs: Blog[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (blogs.length === 0) return <EmptyBlogState />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={handleAddProduct} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت بلاگ جدید
        </Button>
      </Box>
      {!isMobile && <DesktopBlogTable blogs={blogs} />}

      <TablePaginationComponent
        currentPage={page}
        totalPages={paginationData.totalPages}
        totalCount={paginationData.totalCount}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        currentPageItemCount={blogs.length}
      />
    </Card>
  )
}

export default BlogListView
