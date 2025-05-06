'use client'

import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import MobileMediaCard from './MobileMediaCard'
import DesktopMediaTable from './DesktopMediaTable'
import CreateMediaModal from './CreateMediaModal'

// داده‌های نمونه
interface Media {
  id: number
  name: string
  type: 'image' | 'video' | 'document'
  size: string
  uploadedAt: string
  url?: string
}

const mockFiles: Media[] = [
  {
    id: 1,
    name: 'image1.jpg',
    type: 'image',
    size: '2.5 MB',
    uploadedAt: '1404/02/15',
    url: '/sample-image.jpg'
  },
  {
    id: 2,
    name: 'document.pdf',
    type: 'document',
    size: '1.8 MB',
    uploadedAt: '1404/02/14'
  },
  {
    id: 3,
    name: 'video.mp4',
    type: 'video',
    size: '15.3 MB',
    uploadedAt: '1404/02/13'
  }
]

// کامپوننت DebouncedInput
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.ComponentProps<typeof CustomTextField>, 'onChange'>) => {
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

const MediaView = ({ data: initialData = mockFiles }: { data?: Media[] }) => {
  // States
  const [data, setLocalData] = useState<Media[]>(initialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Sync local data
  useEffect(() => {
    setLocalData(initialData)
  }, [initialData])

  // Filter data based on search
  const filteredData = data.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Paginate filtered data
  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

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
        <CreateMediaModal />
        <Box sx={{ display: 'flex', maxWidth: { xs: '100%', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
          <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder='جستجو' sx={{ width: '100%' }} />
        </Box>
      </Box>
      {isMobile ? <MobileMediaCard data={filteredData} paginatedData={paginatedData} /> : <DesktopMediaTable data={filteredData} paginatedData={paginatedData} />}
      <TablePaginationComponent filteredData={filteredData} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={rows => setRowsPerPage(rows)} />
    </Card>
  )
}

export default MediaView
