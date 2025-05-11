import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'
import { Controller, useFormContext } from 'react-hook-form'
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import { type Attribute, type ProductType, type Variant, type VariantCombination } from '@/types/productAttributes'
import { generateCombinations } from './generateCombinations'
import CombinationsList from './CombinationsList'

const VariantsTab = () => {
  const [variants, setVariants] = useState<Variant[]>([])
  const [productType, setProductType] = useState<ProductType>('SIMPLE')
  const [combinations, setCombinations] = useState<VariantCombination[]>([])
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([])

  const {
    register,
    control,
    formState: { errors },
    setValue
  } = useFormContext()

  const {
    data: attributesData,
    isLoading: isLoadingAttributes,
    isFetching: isFetchingAttributes,
    error: errorAttributes
  } = useAttribute({
    enabled: productType === 'VARIABLE',
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (productType === 'VARIABLE' && attributesData?.data?.items) {
      const newCombinations = generateCombinations(variants, attributesData.data.items)

      setCombinations(newCombinations)

      const activeAttributeIds = variants.filter(v => v.attributeId).map(v => v.attributeId)

      const activeCombinationIds = selectedCombinations
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
              const attribute = attributesData?.data?.items?.find((attr: Attribute) => attr.name === attrName)

              if (!attribute) return null

              const valueObj = attribute.values.find((val: { id: number; name: string; colorCode?: string }) => val.name === value)

              return valueObj ? valueObj.id : null
            })
            .filter(id => id !== null) as number[]

          return valueIds.length > 0 ? valueIds : null
        })
        .filter(arr => arr !== null) as number[][]

      setValue('attributeIds', activeAttributeIds, { shouldValidate: true })
      setValue('attributeValuesIds', activeCombinationIds, { shouldValidate: true })
    }
  }, [variants, attributesData, productType, selectedCombinations, setValue])

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
      setCombinations([])
      setSelectedCombinations([])
      setValue('attributeIds', [], { shouldValidate: true })
      setValue('attributeValuesIds', [], { shouldValidate: true })
    }
  }

  const handleVariantTypeChange = (index: number, attributeId: number) => {
    const usedAttributeIds = variants.map(v => v.attributeId)

    if (usedAttributeIds.includes(attributeId)) {
      return
    }

    const newVariants = [...variants]

    newVariants[index].attributeId = attributeId
    newVariants[index].values = []
    setVariants(newVariants)
  }

  const handleVariantValuesChange = (index: number, values: string[]) => {
    const newVariants = [...variants]

    newVariants[index].values = values
    setVariants(newVariants)
  }

  const handleCombinationSelect = (combinationKey: string, value: string) => {
    let updatedSelectedCombinations: string[]

    if (value === 'active') {
      updatedSelectedCombinations = [...selectedCombinations, combinationKey]
    } else {
      updatedSelectedCombinations = selectedCombinations.filter(key => key !== combinationKey)
    }

    setSelectedCombinations(updatedSelectedCombinations)

    const activeCombinationIds = updatedSelectedCombinations
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
            const attribute = attributesData?.data?.items?.find((attr: Attribute) => attr.name === attrName)

            if (!attribute) return null

            const valueObj = attribute.values.find((val: { id: number; name: string; colorCode?: string }) => val.name === value)

            return valueObj ? valueObj.id : null
          })
          .filter(id => id !== null) as number[]

        return valueIds.length > 0 ? valueIds : null
      })
      .filter(arr => arr !== null) as number[][]

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
              const value = e.target.value

              if (value === 'SIMPLE') {
                setValue('attributeIds', [], { shouldValidate: true })
                setValue('attributeValuesIds', [], { shouldValidate: true })
              } else if (value === 'VARIABLE') {
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
                            onChange={e => {
                              const value = e.target.value

                              if (Array.isArray(value)) {
                                handleVariantValuesChange(index, value as string[])
                              }
                            }}
                            slotProps={{
                              select: {
                                multiple: true
                              }
                            }}
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
                <Button variant='contained' onClick={addVariant} startIcon={<i className='tabler-plus' />} disabled={variants.length >= (attributesData?.data?.items?.length || 0)}>
                  افزودن ویژگی دیگر
                </Button>
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
