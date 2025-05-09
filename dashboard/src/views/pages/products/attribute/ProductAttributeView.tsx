'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'

// Component Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CreateUpdateAttributeModal from './CreateAttributeModal'

// API Import
import { Attribute } from '@/types/productAttributes'
import CustomTextField from '@/@core/components/mui/TextField'
import MobileAttributeCard from './MobileAttributeCard'
import DesktopAttributeTable from './DesktopAttributeTable'
import DebouncedInput from '@/components/DebouncedInput'

// Main Component
const ProductAttributeView = ({ data: initialData }: { data: Attribute[] }) => {
  // States
  const [data, setLocalData] = useState<Attribute[]>(initialData || [])
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
        <CreateUpdateAttributeModal />
      </Box>
      {isMobile ? <MobileAttributeCard data={data} paginatedData={paginatedData} /> : <DesktopAttributeTable data={data} paginatedData={paginatedData} />}
      <TablePaginationComponent filteredData={data} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={rows => setRowsPerPage(rows)} />
    </Card>
  )
}

export default ProductAttributeView
