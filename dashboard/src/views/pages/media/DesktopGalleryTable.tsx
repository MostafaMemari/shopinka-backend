'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'
import { Box } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RemoveGalleryModal from './RemoveGalleryModal'
import UpdateGalleryModal from './UpdateGalleryModal'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { Gallery } from '@/types/gallery'

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
const DesktopGalleryTable = ({ data, paginatedData }: { data: Gallery[]; paginatedData: Gallery[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>نام ویژگی</th>
          <th>توضیحات</th>
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
                  {row.title}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.description}
                </Typography>
              </td>

              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <RemoveGalleryModal id={row.id} />
                  <UpdateGalleryModal initialData={row} />
                </Box>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)

export default DesktopGalleryTable
