import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import TabPanel from '@mui/lab/TabPanel'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import useVariants from '@/hooks/useVariants'
import { Attribute } from '@/types/app/productAttributes.type'

const VariantsTab = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()

  const formType = watch('type') || 'SIMPLE'
  const watchedAttributeIds = watch('attributeIds')

  const [attributeIds, setAttributeIds] = useState<number[]>([])

  useEffect(() => {
    setAttributeIds(watchedAttributeIds || [])
  }, [watchedAttributeIds])

  const { attributesData, isLoadingAttributes, isFetchingAttributes, errorAttributes } = useVariants(formType, attributeIds)

  useEffect(() => {
    if (!isLoadingAttributes && !isFetchingAttributes && attributesData?.data?.items) {
      const cleanAttributeIds = Array.from(new Set(attributeIds.filter((id: number) => attributesData.data.items.some((attr: Attribute) => attr.id === id))))

      if (cleanAttributeIds.length !== attributeIds.length) {
        setValue('attributeIds', cleanAttributeIds, { shouldValidate: true })
      }
    }
  }, [attributeIds, attributesData, isLoadingAttributes, isFetchingAttributes, setValue])

  return (
    <TabPanel value='variants' className='flex flex-col gap-4'>
      <Typography variant='h6' className='font-medium'>
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
            onChange={e => {
              field.onChange(e)

              if (e.target.value === 'SIMPLE') {
                setValue('attributeIds', [], { shouldValidate: true })
              }
            }}
            error={!!errors.type}
          >
            <MenuItem value='SIMPLE'>ساده</MenuItem>
            <MenuItem value='VARIABLE'>متغیر</MenuItem>
          </CustomTextField>
        )}
      />
      {formType === 'VARIABLE' && (
        <>
          {isLoadingAttributes || isFetchingAttributes ? (
            <Typography color='text.secondary'>در حال بارگذاری...</Typography>
          ) : errorAttributes ? (
            <Typography color='error'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <Grid container spacing={4}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name='attributeIds'
                  control={control}
                  defaultValue={[]}
                  rules={{ required: false }} // ویژگی‌ها اختیاری
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      multiple
                      options={attributesData?.data?.items?.map((attr: Attribute) => attr.id) || []}
                      getOptionLabel={option => attributesData?.data?.items?.find((attr: Attribute) => attr.id === option)?.name || ''}
                      value={field.value || []}
                      onChange={(_, newValue) => {
                        const uniqueValues = Array.from(new Set(newValue))

                        setValue('attributeIds', uniqueValues, { shouldValidate: true })
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
              </Grid>
            </Grid>
          )}
        </>
      )}
    </TabPanel>
  )
}

export default VariantsTab
