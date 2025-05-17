'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import useVariants from '@/hooks/useVariants'
import { Attribute, ProductType } from '@/types/app/productAttributes.type'

const VariantsTab = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()

  const formType = watch('type') || 'SIMPLE'
  const attributeIds = watch('attributeIds') || []

  const { attributesData, isLoadingAttributes, isFetchingAttributes, errorAttributes } = useVariants(formType, attributeIds)

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' sx={{ fontWeight: 'medium', mb: 2 }}>
          انواع محصول
        </Typography>
        <Controller
          name='type'
          control={control}
          defaultValue='SIMPLE'
          render={({ field }) => (
            <CustomTextField
              select
              fullWidth
              label='نوع محصول'
              {...field}
              value={field.value || 'SIMPLE'}
              onChange={e => {
                field.onChange(e)

                if (e.target.value === 'SIMPLE') {
                  setValue('attributeIds', [], { shouldValidate: true })
                  setValue('attributeValuesIds', [], { shouldValidate: true })
                }
              }}
              error={!!errors.type}
            >
              <MenuItem value='SIMPLE'>ساده</MenuItem>
              <MenuItem value='VARIABLE'>متغیر</MenuItem>
            </CustomTextField>
          )}
        />
      </Grid>
      {formType === 'VARIABLE' && (
        <Grid size={{ xs: 12 }}>
          {isLoadingAttributes || isFetchingAttributes ? (
            <Typography color='text.secondary'>در حال بارگذاری...</Typography>
          ) : errorAttributes ? (
            <Typography color='error'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <Controller
              name='attributeIds'
              control={control}
              defaultValue={[]}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={attributesData?.data?.items?.map((attr: Attribute) => attr.id) || []}
                  getOptionLabel={option => attributesData?.data?.items?.find((attr: Attribute) => attr.id === option)?.name || ''}
                  value={field.value || []}
                  onChange={(_, newValue) => {
                    const uniqueValues = Array.from(new Set(newValue))

                    field.onChange(uniqueValues)
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      label='ویژگی‌ها'
                      placeholder='ویژگی‌ها را انتخاب کنید'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message || 'انتخاب ویژگی‌ها اختیاری است'}
                    />
                  )}
                  renderOption={(props, option) => {
                    const attr = attributesData?.data?.items?.find((attr: Attribute) => attr.id === option)

                    return (
                      <li {...props} key={option}>
                        {attr?.name}
                      </li>
                    )
                  }}
                  noOptionsText='هیچ ویژگی‌ای یافت نشد'
                />
              )}
            />
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default VariantsTab
