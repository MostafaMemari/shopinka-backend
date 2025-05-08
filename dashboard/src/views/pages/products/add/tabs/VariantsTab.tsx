import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

// Types
interface Variant {
  type: 'Size' | 'Color' | 'Weight'
  values: string[]
}

interface VariantOption {
  value: string
  label: string
}

interface VariantCombination {
  [key: string]: string
}

type ProductType = 'simple' | 'variable'

const VariantsTab = () => {
  const [variants, setVariants] = useState<Variant[]>([{ type: 'Size', values: [] }])
  const [productType, setProductType] = useState<ProductType>('simple')
  const [combinations, setCombinations] = useState<VariantCombination[]>([])

  const allVariantTypes: ('Size' | 'Color' | 'Weight')[] = ['Size', 'Color', 'Weight']

  const variantTypeLabels: Record<string, string> = {
    Size: 'اندازه',
    Color: 'رنگ',
    Weight: 'وزن'
  }

  const variantValueLabels: Record<string, Record<string, string>> = {
    Size: {
      small: 'کوچک',
      medium: 'متوسط',
      large: 'بزرگ'
    },
    Color: {
      blue: 'آبی',
      red: 'قرمز',
      yellow: 'زرد',
      green: 'سبز'
    },
    Weight: {
      light: 'سبک',
      medium: 'متوسط',
      heavy: 'سنگین'
    }
  }

  const generateCombinations = (): VariantCombination[] => {
    if (variants.length === 0 || variants.every(v => v.values.length === 0)) {
      return []
    }

    const result: VariantCombination[] = [{}]

    variants.forEach(variant => {
      const newResult: VariantCombination[] = []

      variant.values.forEach(value => {
        result.forEach(comb => {
          newResult.push({ ...comb, [variant.type]: value })
        })
      })

      result.length = 0
      result.push(...newResult)
    })

    return result
  }

  const addVariant = () => {
    const usedTypes = variants.map(v => v.type)
    const availableType = allVariantTypes.find(type => !usedTypes.includes(type)) || 'Size'

    setVariants([...variants, { type: availableType, values: [] }])
  }

  const deleteVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index))
    }
  }

  const handleVariantTypeChange = (index: number, value: 'Size' | 'Color' | 'Weight') => {
    const usedTypes = variants.map(v => v.type)

    if (usedTypes.includes(value)) {
      return
    }

    const newVariants = [...variants]

    newVariants[index].type = value
    newVariants[index].values = []
    setVariants(newVariants)
  }

  const handleVariantValuesChange = (index: number, values: string[]) => {
    const newVariants = [...variants]

    newVariants[index].values = values
    setVariants(newVariants)
  }

  const variantOptions: Record<string, VariantOption[]> = {
    Size: [
      { value: '20cm', label: '۲۰ سانت' },
      { value: '30cm', label: '۳۰ سانت' },
      { value: 'small', label: 'کوچک' },
      { value: 'medium', label: 'متوسط' },
      { value: 'large', label: 'بزرگ' }
    ],
    Color: [
      { value: 'blue', label: 'آبی' },
      { value: 'red', label: 'قرمز' },
      { value: 'yellow', label: 'زرد' },
      { value: 'green', label: 'سبز' }
    ],
    Weight: [
      { value: 'light', label: 'سبک' },
      { value: 'medium', label: 'متوسط' },
      { value: 'heavy', label: 'سنگین' }
    ]
  }

  const getAvailableTypes = (currentIndex: number) => {
    const usedTypes = variants.filter((_, i) => i !== currentIndex).map(v => v.type)

    return allVariantTypes.filter(type => !usedTypes.includes(type))
  }

  return (
    <TabPanel value='variants' className='flex flex-col gap-4'>
      <Typography className='font-medium'>انواع محصول</Typography>
      <CustomTextField select fullWidth label='نوع محصول' value={productType} onChange={e => setProductType(e.target.value as ProductType)} sx={{ marginBottom: 4 }}>
        <MenuItem value='simple'>ساده</MenuItem>
        <MenuItem value='variable'>متغیر</MenuItem>
      </CustomTextField>
      {productType === 'variable' && (
        <>
          <Grid container spacing={6}>
            {variants.map((variant, index) => (
              <Grid key={index} size={{ xs: 12 }} className='repeater-item'>
                <Grid container spacing={6}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomTextField
                      select
                      fullWidth
                      label='گزینه‌ها'
                      value={variant.type}
                      onChange={e => handleVariantTypeChange(index, e.target.value as 'Size' | 'Color' | 'Weight')}
                    >
                      {getAvailableTypes(index).map(type => (
                        <MenuItem key={type} value={type}>
                          {variantTypeLabels[type]}
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
                        SelectProps={{ multiple: true }}
                      >
                        {variantOptions[variant.type].map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
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
            ))}
            <Grid size={{ xs: 12 }}>
              <Button variant='contained' onClick={addVariant} startIcon={<i className='tabler-plus' />} disabled={variants.length >= allVariantTypes.length}>
                افزودن گزینه دیگر
              </Button>
            </Grid>
          </Grid>
          {combinations.length > 0 && (
            <Card sx={{ marginTop: 4 }}>
              <CardHeader title='متغیرهای محصول' />
              <CardContent>
                <List>
                  {combinations.map((combination, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={Object.entries(combination)
                          .map(([type, value]) => `${variantTypeLabels[type]}: ${variantValueLabels[type][value] || value}`)
                          .join(' و ')}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </TabPanel>
  )
}

export default VariantsTab
