'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopBlogTable from './DesktopBlogTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Blog } from '@/types/app/blog.type'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useBlogs } from '@/hooks/reactQuery/useBlog'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyBlogState from './EmptyBlogState'

const BlogListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()
  const router = useRouter()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const handleAddBlog = () => {
    router.push('/blogs/add')
  }

  const { data, isLoading, isFetching, error, refetch } = useBlogs({
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

  const blogs: Blog[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={handleAddBlog} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت وبلاگ جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجوی وبلاگ' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : blogs.length === 0 ? (
        <EmptyBlogState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
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
        </>
      )}
    </Card>
  )
}

export default BlogListView
