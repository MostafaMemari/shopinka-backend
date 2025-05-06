'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'
import { Box, Chip } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RemoveAttributeModal from './RemoveAttributeModal'
import UpdateAttributeModal from './UpdateAttributeModal'
import RemoveAttributeValueModal from './RemoveAttributeValueModal'
import CreateAttributeValueModal from './CreateAttributeValueModal'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { AttributeType, Attribute } from '@/types/productAttributes'

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

// Desktop Table Component
const DesktopAttributeTable = ({ data, paginatedData }: { data: Attribute[]; paginatedData: Attribute[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
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
            <td colSpan={4} className='text-center'>
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
                <Typography>{row.type === AttributeType.BUTTON ? 'دکمه' : 'رنگ'}</Typography>
              </td>
              <td>
                {!!row.values?.length ? (
                  row.type === AttributeType.COLOR ? (
                    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                      {row.values.map(item => (
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
                                    border: theme => `1px solid ${theme.palette.divider}`
                                  }}
                                />
                                {item.name}
                              </Box>
                            }
                            color='secondary'
                            variant='outlined'
                            deleteIcon={<i className='tabler-trash-x' />}
                            sx={{ direction: 'rtl', margin: '2px' }}
                          />
                        </RemoveAttributeValueModal>
                      ))}
                      <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                    </Box>
                  ) : (
                    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                      {row.values.map(item => (
                        <RemoveAttributeValueModal key={item.id} id={item.id}>
                          <Chip label={item.name} color='secondary' variant='outlined' deleteIcon={<i className='tabler-trash-x' />} sx={{ direction: 'rtl', margin: '2px' }} />
                        </RemoveAttributeValueModal>
                      ))}
                      <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                    </Box>
                  )
                ) : (
                  <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                )}
              </td>
              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <RemoveAttributeModal id={row.id} />
                  <UpdateAttributeModal initialData={row} />
                </Box>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)

export default DesktopAttributeTable
