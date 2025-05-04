'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'

// Component Imports
import AddAttributeDrawer from './AddAttributeDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Attribute data type
export type attributeType = {
  id: number
  attributeName: string
  description: string
  values: string
}

// Debounced input component
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

const ProductAttributeTable = ({ data: initialData, setData }: { data: attributeType[]; setData: (data: attributeType[]) => void }) => {
  // States
  const [addOpen, setAddOpen] = useState(false)
  const [data, setLocalData] = useState<attributeType[]>(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Sync local data with prop
  useEffect(() => {
    setLocalData(initialData)
  }, [initialData])

  // Filter data based on search term
  const filteredData = data.filter(
    item =>
      item.attributeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.values.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginate filtered data
  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  return (
    <>
      <Card>
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder='جستجو' className='max-sm:w-full' />
          <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full'>
            <CustomTextField select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))} className='flex-auto max-sm:w-full sm:w-[70px]'>
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='15'>15</MenuItem>
              <MenuItem value='25'>25</MenuItem>
            </CustomTextField>
            <Button variant='contained' className='max-sm:w-full' onClick={() => setAddOpen(!addOpen)} startIcon={<i className='tabler-plus' />}>
              افزودن ویژگی
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto max-md:overflow-x-hidden'>
          {/* Desktop Table */}
          <table className={`${tableStyles.table} max-md:hidden`}>
            <thead>
              <tr>
                <th>نام ویژگی</th>
                <th>توضیحات</th>
                <th>مقادیر</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center'>
                    داده‌ای موجود نیست
                  </td>
                </tr>
              ) : (
                paginatedData.map(row => (
                  <tr key={row.id}>
                    <td>
                      <Typography className='font-medium' color='text.primary'>
                        {row.attributeName}
                      </Typography>
                    </td>
                    <td>
                      <Typography>{row.description}</Typography>
                    </td>
                    <td>
                      <Typography>{row.values}</Typography>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <IconButton
                          onClick={() => {
                            const newData = data.filter(item => item.id !== row.id)

                            setLocalData(newData)
                            setData(newData)
                          }}
                        >
                          <i className='tabler-trash text-gray-600' />
                        </IconButton>
                        <IconButton>
                          <i className='tabler-edit text-gray-600' />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Mobile Cards */}
          <div className='md:hidden p-4 flex flex-col gap-3'>
            {paginatedData.length === 0 ? (
              <Typography className='text-center'>داده‌ای موجود نیست</Typography>
            ) : (
              paginatedData.map(row => (
                <div key={row.id} className='border border-gray-200 rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors'>
                  <Typography className='font-medium text-base mb-2' color='text.primary'>
                    {row.attributeName}
                  </Typography>
                  <div className='flex flex-col gap-1 text-sm'>
                    <Typography variant='body2'>
                      <strong>توضیحات:</strong> {row.description}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>مقادیر:</strong> {row.values}
                    </Typography>
                  </div>
                  <div className='flex justify-end gap-1 mt-2'>
                    <IconButton
                      size='small'
                      onClick={() => {
                        const newData = data.filter(item => item.id !== row.id)

                        setLocalData(newData)
                        setData(newData)
                      }}
                    >
                      <i className='tabler-trash text-gray-500 text-lg' />
                    </IconButton>
                    <IconButton size='small'>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent filteredData={filteredData} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} />}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => setRowsPerPage(Number(e.target.value))}
        />
      </Card>
      <AddAttributeDrawer open={addOpen} data={data} setData={setData} handleClose={() => setAddOpen(!addOpen)} />
    </>
  )
}

export default ProductAttributeTable
