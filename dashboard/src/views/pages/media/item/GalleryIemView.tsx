'use client'

import React, { useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateMediaModal from './CreateMediaModal'
import DesktopMediaGallery from './DesktopMediaGallery'
import RemoveGalleryItemModal from './RemoveMediaModal'
import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/EmptyState'
import { useGalleryItems } from '@/hooks/reactQuery/useGallery'
import LoadingSpinner from '@/components/LoadingSpinner'

const GalleryItemView = ({ galleryId }: { galleryId: string }) => {
  // States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<string[]>([])

  // Query Hook
  const { data, isLoading, isFetching, error, refetch } = useGalleryItems({
    params: {
      galleryId,
      page: page + 1,
      take: rowsPerPage
    },
    enabled: true,
    staleTime: 5 * 60 * 1000
  })

  const handleCheckboxChange = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleClearSelection = () => {
    setSelected([])
  }

  const galleryItems = data?.data?.items || []
  const paginationData = data?.data?.pager || []

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      {galleryItems.length === 0 ? (
        <EmptyState
          title='هیچ رسانه ای یافت نشد'
          subtitle='به نظر می‌رسه هیچ رسانه ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
          icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
        >
          <CreateMediaModal />
        </EmptyState>
      ) : (
        <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 4,
              p: 6
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CreateMediaModal />
              {selected.length > 0 && <RemoveGalleryItemModal selectedImages={selected} onClearSelection={handleClearSelection} />}
            </Box>
          </Box>
          <DesktopMediaGallery data={galleryItems} selected={selected} handleCheckboxChange={handleCheckboxChange} />
          <TablePaginationComponent
            currentPage={paginationData?.currentPage || 1}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.totalCount || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            currentPageItemCount={galleryItems.length}
          />
        </Card>
      )}
    </>
  )
}

export default GalleryItemView
