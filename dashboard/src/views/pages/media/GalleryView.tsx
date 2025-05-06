'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateUpdateGalleryModal from './CreateGalleryModal'

// API Import
import { Gallery } from '@/types/gallery'
import CustomTextField from '@/@core/components/mui/TextField'
import MobileGalleryCard from './MobileGalleryCard'
import DesktopGalleryTable from './DesktopGalleryTable'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
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

// Main Component
const GalleryView = ({ data: initialData }: { data: Gallery[] }) => {
  // States
  const [data, setLocalData] = useState<Gallery[]>(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Sync local data with prop
  useEffect(() => {
    setLocalData(initialData)
  }, [initialData])

  // Paginate filtered data
  const paginatedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateGalleryModal />
        <Box sx={{ display: 'flex', maxWidth: { xs: '100%', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
          <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder='جستجو' sx={{ width: '100%' }} />
        </Box>
      </Box>
      {isMobile ? <MobileGalleryCard data={data} paginatedData={paginatedData} /> : <DesktopGalleryTable data={data} paginatedData={paginatedData} />}
      <TablePaginationComponent filteredData={data} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={rows => setRowsPerPage(rows)} />
    </Card>
  )
}

export default GalleryView
