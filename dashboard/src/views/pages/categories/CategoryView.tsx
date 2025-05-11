'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import NoCategoryMessage from './NoCategoryMessage'
import DesktopCategoryTable from './DesktopCategoryTable'

// API Import
import { Category, CategoryOutlined, PermMedia } from '@mui/icons-material'
import { useCategories } from '@/hooks/reactQuery/useCategory'
import CreateCategoryModal from './CreateCategoryModal'

const CategoryView = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Query Hook
  const { data, isLoading, isFetching, error, refetch } = useCategories({
    enabled: true,
    search: searchTerm,
    staleTime: 5 * 60 * 1000
  })

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Extract items from response
  const categories = data?.data?.items || []

  // Loader component
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.paper'
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round'
            }
          }}
        />
      </Box>
    )
  }

  return (
    <>
      {categories.length === 0 ? (
        <>
          <NoCategoryMessage
            title='هیچ دسته‌بندی یافت نشد'
            subtitle='به نظر می‌رسه هیچ دسته‌بندی در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
            icon={<CategoryOutlined color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
          >
            <CreateCategoryModal>
              <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
                ثبت دسته بندی جدید
              </Button>
            </CreateCategoryModal>
          </NoCategoryMessage>
        </>
      ) : (
        <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
            <CreateCategoryModal>
              <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
                ثبت دسته بندی جدید
              </Button>
            </CreateCategoryModal>
            {/* <Box sx={{ display: 'flex', maxWidth: { xs: '100%', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
              <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder="جستجو" sx={{ width: '100%' }} />
            </Box> */}
          </Box>
          {!isMobile && <DesktopCategoryTable categories={categories} />}
          <TablePaginationComponent filteredData={categories} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />
        </Card>
      )}
    </>
  )
}

export default CategoryView
