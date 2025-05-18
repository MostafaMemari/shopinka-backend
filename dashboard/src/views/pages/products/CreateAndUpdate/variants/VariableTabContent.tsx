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
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { useSearchParams } from 'next/navigation'
import { useProductVariants } from '@/hooks/reactQuery/useProductVariant'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import EmptyCategoryState from '@/views/pages/categories/EmptyCategoryState'
import { createProductVariant } from '@/libs/api/productVariants.api'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const VariableTabContent = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')

  const { data, isLoading, isFetching, error, refetch } = useProductVariants({
    enabled: !!productId,
    params: {
      take: 50,
      productId,
      includeAttributeValues: true,
      includeMainImage: true
    },
    staleTime: 10 * 60 * 1000 // 10 minutes
  })

  const ProductVariants: ProductVariant[] = useMemo(() => data?.data?.items || [], [data])

  const { watch, setValue } = useFormContext()

  const attributes: Attribute[] = useMemo(() => watch('attributes') || [], [watch])
  const formVariants: ProductVariant[] = useMemo(() => watch('variants') || [], [watch])
  const quantity: number | null = useMemo(() => watch('quantity') || null, [watch])
  const weight: number | null = useMemo(() => watch('weight') || null, [watch])
  const width: number | null = useMemo(() => watch('width') || null, [watch])
  const height: number | null = useMemo(() => watch('height') || null, [watch])
  const length: number | null = useMemo(() => watch('length') || null, [watch])
  const basePrice: number | null = useMemo(() => watch('basePrice') || null, [watch])
  const salePrice: number | null = useMemo(() => watch('salePrice') || null, [watch])

  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [expanded, setExpanded] = useState<string | false>(false)
  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([])

  // Initialize variants with ProductVariants from API
  useEffect(() => {
    if (ProductVariants.length > 0 && variants.length === 0) {
      setVariants(ProductVariants)
    }
  }, [ProductVariants, variants.length])

  // Sync formVariants with variants
  useEffect(() => {
    if (formVariants.length > 0) {
      setVariants(prev =>
        prev.map(variant => {
          const formVariant = formVariants.find(fv => fv.id === variant.id)

          return formVariant ? { ...variant, ...formVariant } : variant
        })
      )
    }
  }, [formVariants])

  // Initialize selectedValues based on attributes
  useEffect(() => {
    setSelectedValues(prev => {
      const newValues = attributes.map(attr => {
        const existing = prev.find(v => v.attributeId === attr.id)

        return existing || { attributeId: attr.id, valueId: null, value: '' }
      })

      return newValues.filter(v => attributes.some(attr => attr.id === v.attributeId))
    })
  }, [attributes])

  // Sync variants with form
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
        acc[v.attributeId] = v.id // Use `id` from attributeValues

        return acc
      }, {})

      return (
        Object.keys(selectedValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId]) &&
        Object.keys(variantValuesMap).every(attrId => selectedValuesMap[attrId] === variantValuesMap[attrId] || !selectedValuesMap[attrId])
      )
    })
  }

  const handleAddVariant = async () => {
    const newAttributeValues = selectedValues.filter(v => v.value && v.valueId !== null)
    const attributeValueIds = newAttributeValues.map(v => v.attributeId)

    const { isLoading, onSubmit } = useFormSubmit<ProductVariantForm>({
      createApi: createProductVariant,
      updateApi: updateCategory,
      errorMessages: errorCategoryMessage,
      queryKey: QueryKeys.Categories,
      successMessage: isUpdate ? 'دسته‌بندی با موفقیت به‌روزرسانی شد' : 'دسته‌بندی با موفقیت ایجاد شد',
      initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
      isUpdate
    })

    await createProductVariant(Number(productId), attributeValueIds, {
      quantity: quantity ?? null,
      basePrice: basePrice ?? null,
      salePrice: salePrice ?? null,
      mainImageId: null,
      width: weight ?? null,
      height: weight ?? null,
      length: weight ?? null,
      weight: weight ?? null,
      sku: '',
      shortDescription: null
    })

    if (newAttributeValues.length > 0 && !isDuplicateVariant(newAttributeValues)) {
      const newVariant: ProductVariant = {
        id: Date.now(),

        attributeValues: newAttributeValues.map(v => ({
          id: v.valueId!,
          name: v.value, // Use `value` as `name`
          attributeId: v.attributeId,
          slug: v.value.toLowerCase().replace(/\s+/g, '-'), // Generate slug from value
          colorCode: null,
          buttonLabel: v.value,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
    console.log('Deleted product variant id:', id)
    setVariants(variants.filter(variant => String(variant.id) !== id))
  }

  const handleUpdateVariant = (id: string, updatedFields: Partial<ProductVariant>) => {
    console.log(`Updating variant id: ${id}, updated fields:`, updatedFields)
    setVariants(variants.map(variant => (String(variant.id) === id ? { ...variant, ...updatedFields } : variant)))
  }

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (ProductVariants.length === 0 && variants.length === 0) return <EmptyCategoryState />

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
          <Typography color='text.secondary'>هیچ متغیری وجود ندارد. ویژگی‌ها را انتخاب کنید و متغیر اضافه کنید.</Typography>
        ) : (
          variants.map(variant => (
            <VariantAccordion
              key={variant.id}
              variant={variant}
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
