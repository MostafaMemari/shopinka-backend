'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import { Attribute } from '@/types/app/productAttributes.type'

export type SelectedValue = {
  attributeId: number
  valueId: number | null
  value: string
}

type AttributeSelectorProps = {
  attributes: Attribute[]
  selectedValues: SelectedValue[]
  setSelectedValues: React.Dispatch<React.SetStateAction<SelectedValue[]>>
}

const AttributeSelector = ({ attributes, selectedValues, setSelectedValues }: AttributeSelectorProps) => {
  return (
    <Box sx={{ mb: 4, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        انتخاب ویژگی‌ها
      </Typography>
      <Grid container spacing={4}>
        {attributes.map(attribute => (
          <Grid size={{ xs: 12, sm: 6 }} key={attribute.id}>
            <Autocomplete
              options={attribute.values || []}
              getOptionLabel={option => option.name || ''}
              value={(attribute.values || []).find(opt => opt.id === selectedValues.find(v => v.attributeId === attribute.id)?.valueId) ?? null}
              onChange={(_, newValue) => {
                setSelectedValues(prev => {
                  const existingValue = prev.find(v => v.attributeId === attribute.id)

                  if (existingValue) {
                    return prev.map(v => (v.attributeId === attribute.id ? { ...v, valueId: newValue?.id || null, value: newValue?.name || '' } : v))
                  } else {
                    return [
                      ...prev,
                      {
                        attributeId: attribute.id,
                        valueId: newValue?.id || null,
                        value: newValue?.name || ''
                      }
                    ]
                  }
                })
              }}
              renderInput={params => <CustomTextField {...params} label={attribute.name || 'ویژگی'} placeholder={`انتخاب ${attribute.name || 'ویژگی'}`} />}
              noOptionsText='هیچ مقداری یافت نشد'
              renderOption={(props, option) => {
                const { key, ...restProps } = props

                return (
                  <li key={key} {...restProps}>
                    {attribute.type === 'COLOR' && option.colorCode && (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: option.colorCode,
                          mr: 2
                        }}
                      />
                    )}
                    {option.name || ''}
                  </li>
                )
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AttributeSelector
