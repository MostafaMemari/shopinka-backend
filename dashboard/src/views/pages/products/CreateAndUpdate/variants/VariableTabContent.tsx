'use client'

import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import VariantInformation from './VariantInformation'
import VariantRestock from './VariantRestock'
import VariantPricing from './VariantPricing'
import VariantImage from './VariantImage'

const VariableTabContent = () => {
  const { watch, setValue } = useFormContext()

  const attributes = watch('attributes') || []
  const formVariants = watch('variants') || []

  console.log('Attributes:', attributes)

  const [variants, setVariants] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [selectedValues, setSelectedValues] = useState([])

  // Initialize variants from form data
  useEffect(() => {
    if (formVariants.length > 0 && variants.length === 0) {
      setVariants(
        formVariants.map(variant => ({
          id: variant.id.toString(),
          attributeValues: variant.attributeValues.map(attr => ({
            attributeId: attr.attributeId,
            valueId: attr.id,
            value: attr.name
          })),
          name: variant.shortDescription || '',
          sku: variant.sku || '',
          slug: variant.sku || '',
          shortDescription: variant.shortDescription || '',
          quantity: variant.quantity?.toString() || '',
          weight: variant.weight?.toString() || '',
          width: variant.width?.toString() || '',
          height: variant.height?.toString() || '',
          length: variant.length?.toString() || '',
          basePrice: variant.basePrice?.toString() || '',
          salePrice: variant.salePrice?.toString() || '',
          image: variant.mainImageId ? `/images/${variant.mainImageId}` : undefined
        }))
      )
    }
  }, [formVariants])

  // Sync selectedValues with attributes
  useEffect(() => {
    setSelectedValues(prev => {
      const newValues = attributes.map(attr => {
        const existing = prev.find(v => v.attributeId === attr.id)
        return existing || { attributeId: attr.id, valueId: null, value: '' }
      })
      return newValues.filter(v => attributes.some(attr => attr.id === v.attributeId))
    })
  }, [attributes])

  // Save variants to form
  useEffect(() => {
    setValue('variants', variants, { shouldValidate: true })
  }, [variants, setValue])

  // Check if the selected combination is duplicate
  const isDuplicateVariant = newAttributeValues => {
    return variants.some(variant => {
      const variantValues = variant.attributeValues
      const selectedValuesMap = newAttributeValues.filter(v => v.valueId !== null).reduce((acc, v) => ({ ...acc, [v.attributeId]: v.valueId }), {})
      const variantValuesMap = variantValues.reduce((acc, v) => ({ ...acc, [v.attributeId]: v.valueId }), {})

      return (
        Object.keys(selectedValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId]) &&
        Object.keys(variantValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId] || !selectedValuesMap[attrId])
      )
    })
  }

  const handleAddVariant = () => {
    const newAttributeValues = selectedValues.filter(v => v.value && v.valueId !== null)
    if (newAttributeValues.length > 0 && !isDuplicateVariant(newAttributeValues)) {
      const newVariant = {
        id: `variant-${Date.now()}`,
        attributeValues: newAttributeValues.map(v => ({
          attributeId: v.attributeId,
          valueId: v.valueId,
          value: v.value
        })),
        name: '',
        sku: '',
        slug: '',
        shortDescription: '',
        quantity: '',
        weight: '',
        width: '',
        height: '',
        length: '',
        basePrice: '',
        salePrice: '',
        image: undefined
      }

      setVariants([...variants, newVariant])
      setExpanded(newVariant.id)
      setSelectedValues(attributes.map(attr => ({ attributeId: attr.id, valueId: null, value: '' })))
    }
  }

  const handleDeleteVariant = id => {
    setVariants(variants.filter(variant => variant.id !== id))
  }

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleUpdateVariant = (id, updatedFields) => {
    setVariants(variants.map(variant => (variant.id === id ? { ...variant, ...updatedFields } : variant)))
  }

  const handleSave = () => {
    console.log('Saved Variants:', variants)
    variants.forEach((variant, index) => {
      console.log(`Accordion ${index + 1} Data:`, {
        id: variant.id,
        attributeValues: variant.attributeValues,
        name: variant.name,
        sku: variant.sku,
        slug: variant.slug,
        shortDescription: variant.shortDescription,
        quantity: variant.quantity,
        weight: variant.weight,
        width: variant.width,
        height: variant.height,
        length: variant.length,
        basePrice: variant.basePrice,
        salePrice: variant.salePrice,
        image: variant.image
      })
    })
  }

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardHeader
        title='مدیریت متغیرهای محصول'
        action={
          <>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddVariant}
              disabled={!selectedValues.some(v => v.value && v.valueId !== null) || isDuplicateVariant(selectedValues.filter(v => v.value && v.valueId !== null))}
              sx={{ mr: 2 }}
            >
              افزودن متغیر
            </Button>
            <Button variant='contained' startIcon={<SaveIcon />} onClick={handleSave}>
              ثبت
            </Button>
          </>
        }
      />
      <CardContent>
        {/* Attribute Selection Form */}
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
                  getOptionKey={option => option.id}
                  value={(attribute.values || []).find(opt => opt.id === selectedValues.find(v => v.attributeId === attribute.id)?.valueId) || null}
                  onChange={(_, newValue) => {
                    setSelectedValues(prev => prev.map(v => (v.attributeId === attribute.id ? { ...v, valueId: newValue?.id || null, value: newValue?.name || '' } : v)))
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

        {/* Variants List */}
        {variants.length === 0 ? (
          <Typography color='text.secondary'>هیچ متغیری اضافه نشده است. ویژگی‌ها را انتخاب کنید و متغیر اضافه کنید.</Typography>
        ) : (
          variants.map(variant => (
            <Accordion key={variant.id} expanded={expanded === variant.id} onChange={handleChange(variant.id)} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
              <AccordionSummary expandIcon={<i className='tabler-chevron-down' />} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Tooltip title='حذف متغیر'>
                    <IconButton size='small' color='error' onClick={() => handleDeleteVariant(variant.id)} sx={{ mr: 2 }}>
                      <DeleteOutlineIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Typography>
                    {variant.attributeValues
                      .map(av => {
                        const attr = attributes.find(a => a.id === av.attributeId)
                        return `${attr?.name || 'ویژگی'}: ${av.value || 'نامشخص'}`
                      })
                      .join(', ') || 'متغیر جدید'}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={6}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12 }}>
                        <VariantInformation variant={variant} onUpdate={fields => handleUpdateVariant(variant.id, fields)} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <VariantRestock variant={variant} onUpdate={fields => handleUpdateVariant(variant.id, fields)} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12 }}>
                        <VariantPricing variant={variant} onUpdate={fields => handleUpdateVariant(variant.id, fields)} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <VariantImage variant={variant} onUpdate={fields => handleUpdateVariant(variant.id, fields)} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default VariableTabContent
