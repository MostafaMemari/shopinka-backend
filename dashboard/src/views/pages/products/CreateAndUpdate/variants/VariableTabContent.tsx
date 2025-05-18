'use client'

import { useState, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import AttributeSelector, { SelectedValue } from './AttributeSelector'
import VariantAccordion from './VariantAccordion'
import { Attribute } from '@/types/app/productAttributes.type'
import { ProductVariant } from '@/types/app/productVariant.type'

const VariableTabContent = () => {
  const { watch, setValue } = useFormContext()

  const attributes: Attribute[] = useMemo(() => watch('attributes') || [], [watch])
  const formVariants: ProductVariant[] = useMemo(() => watch('variants') || [], [watch])
  const quantity: number = useMemo(() => watch('quantity') || null, [watch])
  const weight: number = useMemo(() => watch('weight') || null, [watch])
  const width: number = useMemo(() => watch('width') || null, [watch])
  const height: number = useMemo(() => watch('height') || null, [watch])
  const length: number = useMemo(() => watch('length') || null, [watch])
  const basePrice: number = useMemo(() => watch('basePrice') || null, [watch])
  const salePrice: number = useMemo(() => watch('salePrice') || null, [watch])

  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [expanded, setExpanded] = useState<string | false>(false)
  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([])

  useEffect(() => {
    if (formVariants.length > 0 && variants.length === 0) {
      setVariants(
        formVariants.map(variant => ({
          id: variant.id || Date.now(),
          attributeValues: (variant.attributeValues ?? []).map(attr => ({
            attributeId: attr.attributeId,
            valueId: attr.id,
            value: attr.name
          })),
          name: variant.shortDescription || '',
          sku: variant.sku || '',
          shortDescription: variant.shortDescription || '',
          quantity: variant.quantity ?? null,
          weight: variant.weight ?? null,
          width: variant.width ?? null,
          height: variant.height ?? null,
          length: variant.length ?? null,
          basePrice: variant.basePrice ?? null,
          salePrice: variant.salePrice ?? null,
          image: variant.mainImageId ? { fileUrl: `/images/${variant.mainImageId}`, title: variant.shortDescription || 'تصویر متغیر' } : undefined,
          mainImage: variant.mainImage ?? undefined
        }))
      )
    }
  }, [formVariants, variants.length])

  useEffect(() => {
    setSelectedValues(prev => {
      const newValues = attributes.map(attr => {
        const existing = prev.find(v => v.attributeId === attr.id)

        return existing || { attributeId: attr.id, valueId: null, value: '' }
      })

      return newValues.filter(v => attributes.some(attr => attr.id === v.attributeId))
    })
  }, [attributes])

  useEffect(() => {
    setValue('variants', variants, { shouldValidate: true })
  }, [variants, setValue])

  const isDuplicateVariant = (newAttributeValues: SelectedValue[]) => {
    return variants.some(variant => {
      const variantValues = variant.attributeValues ?? []

      const selectedValuesMap = newAttributeValues
        .filter(v => v.valueId !== null)
        .reduce<{ [key: string]: number | null }>((acc, v) => {
          acc[v.attributeId] = v.valueId

          return acc
        }, {})

      const variantValuesMap = variantValues.reduce<{ [key: string]: number | null }>((acc, v) => {
        acc[v.attributeId] = v.valueId

        return acc
      }, {})

      return (
        Object.keys(selectedValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId]) &&
        Object.keys(variantValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId] || !selectedValuesMap[attrId])
      )
    })
  }

  const handleAddVariant = () => {
    const newAttributeValues = selectedValues.filter(v => v.value && v.valueId !== null)

    if (newAttributeValues.length > 0 && !isDuplicateVariant(newAttributeValues)) {
      const newVariant: ProductVariant = {
        id: Date.now(),
        attributeValues: newAttributeValues.map(v => ({
          attributeId: v.attributeId,
          valueId: v.valueId!,
          value: v.value
        })),
        sku: '',
        shortDescription: '',
        quantity: quantity ?? null,
        weight: weight ?? null,
        width: width ?? null,
        height: height ?? null,
        length: length ?? null,
        basePrice: basePrice ?? null,
        salePrice: salePrice ?? null,
        mainImage: undefined
      }

      setVariants([...variants, newVariant])
      setExpanded(String(newVariant.id))
      setSelectedValues(attributes.map(attr => ({ attributeId: attr.id, valueId: null, value: '' })))
    }
  }

  const handleDeleteVariant = (id: string) => {
    setVariants(variants.filter(variant => String(variant.id) !== id))
  }

  const handleUpdateVariant = (id: string, updatedFields: Partial<ProductVariant>) => {
    console.log(updatedFields)

    setVariants(variants.map(variant => (String(variant.id) === id ? { ...variant, ...updatedFields } : variant))) // اصلاح شرط
  }

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardHeader
        title='مدیریت متغیرهای محصول'
        action={
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddVariant}
            disabled={!selectedValues.some(v => v.value && v.valueId !== null) || isDuplicateVariant(selectedValues.filter(v => v.value && v.valueId !== null))}
          >
            افزودن متغیر
          </Button>
        }
      />
      <CardContent>
        <AttributeSelector attributes={attributes} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
        {variants.length === 0 ? (
          <Typography color='text.secondary'>هیچ متغیری اضافه نشده است. ویژگی‌ها را انتخاب کنید و متغیر اضافه کنید.</Typography>
        ) : (
          variants.map(variant => (
            <VariantAccordion
              key={variant.id}
              variant={variant}
              attributes={attributes}
              expanded={expanded === String(variant.id)}
              onChange={() => setExpanded(expanded === String(variant.id) ? false : String(variant.id))}
              onDelete={handleDeleteVariant}
              onUpdate={handleUpdateVariant}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default VariableTabContent
