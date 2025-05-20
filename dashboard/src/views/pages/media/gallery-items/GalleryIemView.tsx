'use client'

import { useState, useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopMediaGallery from './DesktopMediaGallery'
import CreateMediaModal from './CreateMediaModal'
import RemoveGalleryItemModal from './RemoveMediaModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useGalleryItems } from '@/hooks/reactQuery/useGallery'
import { GalleryItem } from '@/types/app/gallery.type'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyGalleryItemsState from './EmptyGalleryItemsState'
import { useSearch } from '@/hooks/useSearchQuery'
import { useDebounce } from 'react-use'
import CustomTextField from '@/@core/components/mui/TextField'

const GalleryItemView = ({ galleryId }: { galleryId: string }) => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [selected, setSelected] = useState<string[]>([])

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, debounceDelay)

    return () => clearTimeout(timer)
  }, [inputValue, debounceDelay])

  useEffect(() => {
    setSearch(debouncedValue)
  }, [debouncedValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useGalleryItems({
    params: {
      galleryId,
      page,
      take: size
    },
    enabled: !!galleryId,
    staleTime: 5 * 60 * 1000
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const galleryItems: GalleryItem[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  useEffect(() => {
    const validIds = galleryItems.map(item => item.id)

    setSelected(prev => {
      const newSelected = prev.filter(id => validIds.includes(Number(id)))

      return newSelected.length === prev.length ? prev : newSelected
    })
  }, [galleryItems])

  const handleCheckboxChange = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleClearSelection = () => {
    setSelected([])
  }

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CreateMediaModal>
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت رسانه جدید
            </Button>
          </CreateMediaModal>
          {selected.length > 0 && <RemoveGalleryItemModal selectedImages={selected} onClearSelection={handleClearSelection} />}
        </Box>
        <CustomTextField id='form-props-search' placeholder='جستجوی رسانه' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {galleryItems.length === 0 ? (
        <EmptyGalleryItemsState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopMediaGallery data={galleryItems} selected={selected} handleCheckboxChange={handleCheckboxChange} />

          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={galleryItems.length}
          />
        </>
      )}
    </Card>
  )
}

export default GalleryItemView
