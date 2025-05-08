'use client'

import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme, Button, Typography } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateMediaModal from './CreateMediaModal'
import UpdateGalleryItemModal from './UpdateGalleryItemModal'
import { GalleryItem } from '@/types/gallery'
import DesktopMediaGallery from './DesktopMediaGallery'
import { removeGalleryItem } from '@/libs/api/galleyItem'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'
import RemoveGalleryItemModal from './RemoveMediaModal'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: { value: string | number; onChange: (value: string | number) => void; debounce?: number } & Omit<React.ComponentProps<typeof CustomTextField>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const GalleryItemView = ({ data: initialData }: { data?: GalleryItem[] }) => {
  // States
  const [data, setLocalData] = useState<GalleryItem[]>(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    setLocalData(initialData || [])
  }, [initialData])

  const filteredData = data.filter(file => file.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  const handleCheckboxChange = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleClearSelection = () => {
    setSelected([])
  }

  return (
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
        <Box sx={{ display: 'flex', maxWidth: { xs: '100%', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
          <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder='جستجو' sx={{ width: '100%' }} />
        </Box>
      </Box>

      <DesktopMediaGallery paginatedData={paginatedData} selected={selected} handleCheckboxChange={handleCheckboxChange} />

      <TablePaginationComponent filteredData={filteredData} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />

      {/* {selectedItem && (
        <UpdateGalleryItemModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          codified_id={selectedItem.id}
          initialData={{ title: selectedItem.title, description: selectedItem.description }}
        />
      )} */}
    </Card>
  )
}

export default GalleryItemView
