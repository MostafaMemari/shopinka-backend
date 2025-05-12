'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopMediaGallery from './DesktopMediaGallery'
import CreateMediaModal from './CreateMediaModal'
import RemoveGalleryItemModal from './RemoveMediaModal'
import LoadingSpinner from '@/components/LoadingSpinner'

// API Import
import { useGalleryItems } from '@/hooks/reactQuery/useGallery'
import { GalleryItem } from '@/types/gallery'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyGalleryItemsState from './EmptyGalleryItemState'

const GalleryItemView = ({ galleryId }: { galleryId: string }) => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const [selected, setSelected] = useState<string[]>([])

  const { data, isLoading, isFetching, error, refetch } = useGalleryItems({
    params: {
      galleryId,
      page,
      take: size
    },
    enabled: !!galleryId,
    staleTime: 5 * 60 * 1000
  })

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
  if (galleryItems.length === 0) return <EmptyGalleryItemsState />

  // Main render
  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CreateMediaModal>
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>
              آپلود رسانه جدید
            </Button>
          </CreateMediaModal>
          {selected.length > 0 && <RemoveGalleryItemModal selectedImages={selected} onClearSelection={handleClearSelection} />}
        </Box>
      </Box>
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
    </Card>
  )
}

export default GalleryItemView
