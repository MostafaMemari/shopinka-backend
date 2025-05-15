import { useState, useEffect, useMemo } from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'
import { Controller, useFormContext } from 'react-hook-form'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import { type Attribute, type ProductType, type Variant, type VariantCombination } from '@/types/app/productAttributes'
import { generateCombinations } from './generateCombinations'
import CombinationsList from './CombinationsList'

const VariantsTab = () => {
  const [variants, setVariants] = useState<Variant[]>([])
  const [productType, setProductType] = useState<ProductType>('SIMPLE')
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([])

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue
  } = useFormContext()

  // دریافت مقادیر attributeIds و attributeValuesIds
  const attributeIds = watch('attributeIds')
  const attributeValuesIds = watch('attributeValuesIds')

  // تنظیم پیش‌فرض برای productType بر اساس مقدار اولیه type
  const formType = watch('type') || 'SIMPLE'

  useEffect(() => {
    setProductType(formType)
  }, [formType])

  const {
    data: attributesData,
    isLoading: isLoadingAttributes,
    isFetching: isFetchingAttributes,
    error: errorAttributes
  } = useAttribute({
    enabled: productType === 'VARIABLE',
    staleTime: 5 * 60 * 1000
  })

  const combinations = useMemo(() => {
    if (productType === 'VARIABLE' && attributesData?.data?.items) {
      return generateCombinations(variants, attributesData.data.items)
    }

    return []
  }, [variants, attributesData, productType])

  const calculateActiveCombinationIds = (selectedCombinations: string[], combinations: VariantCombination[], attributes: Attribute[]): number[][] => {
    return selectedCombinations
      .map(key => {
        const combination = combinations.find(comb => {
          const combinationKey = Object.entries(comb)
            .map(([attrName, value]) => `${attrName}:${value}`)
            .join('|')

          return combinationKey === key
        })

        if (!combination) return null

        const valueIds = Object.entries(combination)
          .map(([attrName, value]) => {
            const attribute = attributes.find(attr => attr.name === attrName)

            if (!attribute) return null
            const valueObj = attribute.values.find(val => val.name === value)

            return valueObj ? valueObj.id : null
          })
          .filter((id): id is number => id !== null)

        return valueIds.length > 0 ? valueIds : null
      })
      .filter((arr): arr is number[] => arr !== null)
  }

  useEffect(() => {
    if (productType === 'VARIABLE' && attributesData?.data?.items) {
      const activeAttributeIds = variants.filter(v => v.attributeId).map(v => v.attributeId)
      const activeCombinationIds = calculateActiveCombinationIds(selectedCombinations, combinations, attributesData.data.items)

      setValue('attributeIds', activeAttributeIds, { shouldValidate: true })
      setValue('attributeValuesIds', activeCombinationIds, { shouldValidate: true })
    }
  }, [variants, attributesData, productType, selectedCombinations, setValue, combinations])

  const addVariant = () => {
    const usedAttributeIds = variants.map(v => v.attributeId)
    const availableAttribute = attributesData?.data?.items?.find((attr: Attribute) => !usedAttributeIds.includes(attr.id))

    if (availableAttribute) {
      setVariants([...variants, { attributeId: availableAttribute.id, values: [] }])
    }
  }

  const deleteVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index)

    setVariants(newVariants)

    if (newVariants.length === 0) {
      setSelectedCombinations([])
      setValue('attributeIds', [], { shouldValidate: true })
      setValue('attributeValuesIds', [], { shouldValidate: true })
    }
  }

  const handleVariantTypeChange = (index: number, attributeId: number) => {
    const usedAttributeIds = variants.map(v => v.attributeId)

    if (usedAttributeIds.includes(attributeId)) return
    const newVariants = [...variants]

    newVariants[index].attributeId = attributeId
    newVariants[index].values = []
    setVariants(newVariants)
  }

  const handleVariantValuesChange = (index: number, values: string[]) => {
    const newVariants = [...variants] as Variant[]

    newVariants[index].values = values
    setVariants(newVariants)
  }

  const handleCombinationSelect = (combinationKey: string, value: string) => {
    const updatedSelectedCombinations = value === 'active' ? [...selectedCombinations, combinationKey] : selectedCombinations.filter(key => key !== combinationKey)

    setSelectedCombinations(updatedSelectedCombinations)
    const activeCombinationIds = calculateActiveCombinationIds(updatedSelectedCombinations, combinations, attributesData?.data?.items || [])

    setValue('attributeValuesIds', activeCombinationIds, { shouldValidate: true })
  }

  const getAvailableAttributes = (currentIndex: number): Attribute[] => {
    const usedAttributeIds = variants.filter((_, i) => i !== currentIndex).map(v => v.attributeId)

    return attributesData?.data?.items?.filter((attr: Attribute) => !usedAttributeIds.includes(attr.id)) || []
  }

  return (
    <TabPanel value='variants' className='flex flex-col gap-4'>
      <Typography className='font-medium'>انواع محصول</Typography>
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

              if (value === 'SIMPLE') {
                setValue('attributeIds', [], { shouldValidate: true })
                setValue('attributeValuesIds', [], { shouldValidate: true })
                setProductType('SIMPLE')
              } else {
                setProductType('VARIABLE')
              }
            }}
            sx={{ marginBottom: 4 }}
          >
            <MenuItem value='SIMPLE'>ساده</MenuItem>
            <MenuItem value='VARIABLE'>متغیر</MenuItem>
          </CustomTextField>
        )}
      />
      {/* نمایش مقادیر attributeIds و attributeValuesIds */}
      {productType === 'VARIABLE' && (
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Typography variant='body1'>
              <strong>شناسه‌های ویژگی‌ها:</strong> {attributeIds?.length > 0 ? attributeIds.join(', ') : 'هیچ ویژگی انتخاب نشده'}
            </Typography>
            <Typography variant='body1'>
              <strong>شناسه‌های مقادیر ویژگی‌ها:</strong>{' '}
              {attributeValuesIds?.length > 0 ? attributeValuesIds.map((ids: number[]) => `[${ids.join(', ')}]`).join(' | ') : 'هیچ مقداری انتخاب نشده'}
            </Typography>
          </Grid>
        </Grid>
      )}
      {productType === 'VARIABLE' && (
        <>
          {isLoadingAttributes || isFetchingAttributes ? (
            <Typography>در حال بارگذاری...</Typography>
          ) : errorAttributes ? (
            <Typography color='error'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <Grid container spacing={6}>
              {variants.map((variant, index) => {
                const attribute = attributesData?.data?.items?.find((a: Attribute) => a.id === variant.attributeId)

                return (
                  <Grid key={index} size={{ xs: 12 }} className='repeater-item'>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <CustomTextField
                          select
                          fullWidth
                          label='ویژگی'
                          value={variant.attributeId || ''}
                          onChange={e => handleVariantTypeChange(index, Number(e.target.value))}
                          error={!!errors.attributeIds}
                          helperText={errors.attributeIds?.message?.toString()}
                        >
                          {getAvailableAttributes(index).map(attr => (
                            <MenuItem key={attr.id} value={attr.id}>
                              {attr.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 8 }} alignSelf='end'>
                        <div className='flex items-center gap-6'>
                          <CustomTextField
                            select
                            fullWidth
                            label='مقادیر'
                            value={variant.values}
                            onChange={e => handleVariantValuesChange(index, e.target.value as unknown as string[])}
                            slotProps={{ select: { multiple: true } }}
                          >
                            {attribute?.values?.map((value: { id: number; name: string; colorCode?: string }) => (
                              <MenuItem key={value.id} value={value.name}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                  <span>{value.name}</span>
                                  {value.colorCode && (
                                    <span
                                      style={{
                                        marginLeft: 10,
                                        width: 16,
                                        height: 16,
                                        backgroundColor: value.colorCode,
                                        border: '1px solid #ccc'
                                      }}
                                    />
                                  )}
                                </div>
                              </MenuItem>
                            ))}
                          </CustomTextField>
                          <CustomIconButton onClick={() => deleteVariant(index)} className='min-is-fit mt-4'>
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
                  <Button variant='contained' onClick={addVariant} startIcon={<i className='tabler-plus' />}>
                    افزودن ویژگی دیگر
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
          <CombinationsList
            combinations={combinations}
            selectedCombinations={selectedCombinations}
            onCombinationSelect={handleCombinationSelect}
            attributes={attributesData?.data?.items || []}
          />
        </>
      )}
    </TabPanel>
  )
}

export default VariantsTab
