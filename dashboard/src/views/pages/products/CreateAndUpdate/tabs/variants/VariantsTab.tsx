import { useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'
import CombinationsList from './CombinationsList'
import useVariants from '@/hooks/useVariants'
import { ProductType, Attribute, Variant } from '@/types/app/productAttributes.type'

const VariantsTab = () => {
  const { control, watch, setValue } = useFormContext()
  const attributeIds = watch('attributeIds')
  const attributeValuesIds = watch('attributeValuesIds') || []
  const formType = watch('type') || 'SIMPLE'
  const [productType, setProductType] = useState<ProductType>(formType)

  const attributeValuesIdsFlat = [...new Set(attributeValuesIds.flat())]

  console.log(attributeValuesIdsFlat)

  const {
    variants,
    combinations,
    selectedCombinations,
    attributesData,
    isLoadingAttributes,
    isFetchingAttributes,
    errorAttributes,
    addVariant,
    deleteVariant,
    handleVariantTypeChange,
    handleVariantValuesChange,
    handleCombinationSelect
  } = useVariants(productType, attributeIds)

  useEffect(() => {
    setProductType(formType)

    if (formType === 'SIMPLE') {
      setValue('attributeIds', [], { shouldValidate: true })
      setValue('attributeValuesIds', [], { shouldValidate: true })
    }
  }, [formType, setValue])

  return (
    <TabPanel value='variants' className='flex flex-col gap-4'>
      <Typography className='font-medium text-lg'>انواع محصول</Typography>
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
              const value = e.target.value as ProductType

              setProductType(value)

              if (value === 'SIMPLE') {
                setValue('attributeIds', [], { shouldValidate: true })
                setValue('attributeValuesIds', [], { shouldValidate: true })
              }
            }}
            className='mb-4'
          >
            <MenuItem value='SIMPLE'>ساده</MenuItem>
            <MenuItem value='VARIABLE'>متغیر</MenuItem>
          </CustomTextField>
        )}
      />
      {productType === 'VARIABLE' && (
        <>
          {isLoadingAttributes || isFetchingAttributes ? (
            <Typography className='text-gray-600'>در حال بارگذاری...</Typography>
          ) : errorAttributes ? (
            <Typography className='text-red-600'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <Grid container spacing={6}>
              {variants.map((variant: Variant, index: number) => {
                const attribute = attributesData?.data?.items?.find((a: Attribute) => a.id === variant.attributeId)
                const isFullySelected = attribute?.values?.every(value => attributeValuesIdsFlat.includes(value.id))

                // اگر مقدار دستی وارد نشده و انتخاب کامل هست، مقادیر پیش‌فرض را ست کن
                const selectedValues =
                  variant.values && variant.values.length > 0
                    ? variant.values
                    : isFullySelected
                      ? attribute?.values?.filter(value => attributeValuesIdsFlat.includes(value.id)).map(value => value.name)
                      : []

                return (
                  <Grid key={index} size={{ xs: 12 }} className='repeater-item'>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <CustomTextField select fullWidth label='ویژگی' value={variant.attributeId || ''} onChange={e => handleVariantTypeChange(index, Number(e.target.value))}>
                          {attributesData?.data?.items?.map((attr: Attribute) => (
                            <MenuItem key={attr.id} value={attr.id} disabled={variants.some((v, i) => i !== index && v.attributeId === attr.id)}>
                              {attr.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 8 }} className='flex items-end'>
                        <div className='flex items-center gap-6 w-full'>
                          <CustomTextField
                            select
                            fullWidth
                            label='مقادیر'
                            value={selectedValues}
                            onChange={e => handleVariantValuesChange(index, e.target.value as unknown as string[])}
                            slotProps={{ select: { multiple: true } }}
                          >
                            {attribute?.values?.map((value: { id: number; name: string; colorCode?: string }) => (
                              <MenuItem key={value.id} value={value.name}>
                                <div className='flex items-center justify-between w-full'>
                                  <span>{value.name}</span>
                                  {value.colorCode && <span className='ml-2 w-4 h-4 border border-gray-300' style={{ backgroundColor: value.colorCode }} />}
                                </div>
                              </MenuItem>
                            ))}
                          </CustomTextField>

                          <CustomIconButton onClick={() => deleteVariant(index)} className='min-w-fit mt-4'>
                            <i className='tabler-x' />
                          </CustomIconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })}

              <Grid size={{ xs: 12 }}>
                {!(variants.length >= (attributesData?.data?.items?.length || 0)) && (
                  <Button variant='contained' onClick={addVariant} startIcon={<i className='tabler-plus' />} className='bg-blue-600 hover:bg-blue-700'>
                    افزودن ویژگی دیگر
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
          <CombinationsList
            combinations={combinations}
            selectedCombinations={selectedCombinations}
            attributes={attributesData?.data?.items || []}
            attributeValuesIds={attributeValuesIds}
            onCombinationSelect={handleCombinationSelect}
          />
        </>
      )}
    </TabPanel>
  )
}

export default VariantsTab
