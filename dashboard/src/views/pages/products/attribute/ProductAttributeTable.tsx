'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'
import { Box, CardContent, Chip } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// API Import
import { AttributeType, Attribute } from '@/types/productAttributes'
import CreateUpdateAttributeModal from './CreateAttributeModal'
import RemoveAttributeModal from './RemoveAttributeModal'
import UpdateAttributeModal from './UpdateAttributeModal'
import RemoveAttributeValueModal from './RemoveAttributeValueModal'
import CreateAttributeValueModal from './CreateAttributeValueModal'

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

const ProductAttributeTable = ({ data: initialData }: { data: Attribute[] }) => {
  // States
  const [data, setLocalData] = useState<Attribute[]>(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Sync local data with prop
  useEffect(() => {
    setLocalData(initialData)
  }, [initialData])

  // Paginate filtered data
  const paginatedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  const handleDelete = (attributeValueId: number) => {
    // eslint-disable-next-line no-console
    console.info('You clicked the delete icon.')
  }

  return (
    <>
      <Card>
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <CreateUpdateAttributeModal />

          <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full'>
            <DebouncedInput value={searchTerm} onChange={value => setSearchTerm(String(value))} placeholder='جستجو' className='max-sm:w-full' />
          </div>
        </div>
        <div className='overflow-x-auto max-md:overflow-x-hidden'>
          {/* Desktop Table */}
          <table className={`${tableStyles.table} max-md:hidden`}>
            <thead>
              <tr>
                <th>نام ویژگی</th>
                <th>نوع</th>
                <th>متغییر ها</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className='text-center'>
                    داده‌ای موجود نیست
                  </td>
                </tr>
              ) : (
                paginatedData.map(row => (
                  <tr key={row.id}>
                    <td>
                      <Typography className='font-medium' color='text.primary'>
                        {row.name}
                      </Typography>
                    </td>
                    <td>
                      <Typography>{row.type === AttributeType.BUTTON ? 'دکمه' : 'رنگ'}</Typography>{' '}
                    </td>
                    <td>
                      {!!row.values?.length ? (
                        row.type === AttributeType.COLOR ? (
                          row.values.map(item => (
                            <RemoveAttributeValueModal key={item.id} id={item.id}>
                              <Chip
                                label={
                                  <Box display='flex' alignItems='center' gap={1}>
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: item.colorCode || '#999',
                                        border: '1px solid #ccc'
                                      }}
                                    />
                                    {item.name}
                                  </Box>
                                }
                                color='secondary'
                                variant='outlined'
                                deleteIcon={<i className='tabler-trash-x' />}
                                sx={{
                                  direction: 'rtl',
                                  margin: '2px'
                                }}
                              />
                            </RemoveAttributeValueModal>
                          ))
                        ) : (
                          row.values.map(item => (
                            <Chip
                              key={item.id}
                              label={item.name}
                              sx={{
                                direction: 'rtl',
                                color: item.colorCode
                              }}
                              variant='outlined'
                              onDelete={handleDelete}
                            />
                          ))
                        )
                      ) : (
                        <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                      )}
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <RemoveAttributeModal id={row.id} />
                        <UpdateAttributeModal initialData={row} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2, p: 2 }}>
          {paginatedData.length === 0 ? (
            <Typography textAlign='center'>داده‌ای موجود نیست</Typography>
          ) : (
            paginatedData.map(row => (
              <Card
                key={row.id}
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  },
                  transition: 'background-color 0.2s'
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography variant='h6' fontWeight='medium' color='text.primary' mb={2}>
                    {row.name}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>نوع:</strong> {row.type === AttributeType.BUTTON ? 'دکمه' : 'رنگ'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <RemoveAttributeModal id={row.id} />
                    <UpdateAttributeModal initialData={row} />
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        <TablePaginationComponent filteredData={data} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={rows => setRowsPerPage(rows)} />
      </Card>
    </>
  )
}

export default ProductAttributeTable
