'use client'

import { useState, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import VariantAccordion from './VariantAccordion'
import { Attribute } from '@/types/app/productAttributes.type'
import { ProductVariant } from '@/types/app/productVariant.type'
import { useSearchParams } from 'next/navigation'
import { useProductVariants } from '@/hooks/reactQuery/useProductVariant'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import EmptyCategoryState from '@/views/pages/categories/EmptyCategoryState'
import CreateProductVariantModal from './CreateProductVariant'
import { updateProductVariant } from './UpdateProductVariant'

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
    staleTime: 10 * 60 * 1000
  })

  const ProductVariants: ProductVariant[] = useMemo(() => data?.data?.items || [], [data])

  const { watch, setValue } = useFormContext()

  const attributes: Attribute[] = useMemo(() => watch('attributes') || [], [watch])

  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [expanded, setExpanded] = useState<string | false>(false)

  useEffect(() => {
    setVariants([])
  }, [productId])

  useEffect(() => {
    if (ProductVariants.length > 0) {
      setVariants(prevVariants => {
        const updatedVariants = ProductVariants.map(newVariant => {
          const existingVariant = prevVariants.find(v => String(v.id) === String(newVariant.id))

          return existingVariant ? { ...newVariant, ...existingVariant } : newVariant
        })

        return updatedVariants
      })
    }
  }, [ProductVariants])

  useEffect(() => {
    setValue('variants', variants, { shouldValidate: true })
  }, [variants, setValue])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />
  if (ProductVariants.length === 0 && variants.length === 0) return <EmptyCategoryState />

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardHeader
        title='مدیریت متغیرهای محصول'
        action={
          <CreateProductVariantModal productId={String(productId)} attributes={attributes}>
            <Button variant='contained' startIcon={<AddIcon />}>
              افزودن متغیر
            </Button>
          </CreateProductVariantModal>
        }
      />
      <CardContent>
        {variants.length === 0 ? (
          <Typography color='text.secondary'>هیچ متغیری وجود ندارد. ویژگی‌ها را انتخاب کنید و متغیر اضافه کنید.</Typography>
        ) : (
          variants.map(variant => (
            <VariantAccordion
              key={variant.id}
              variant={variant}
              expanded={expanded === String(variant.id)}
              onChange={() => setExpanded(expanded === String(variant.id) ? false : String(variant.id))}
              onUpdate={(id, updatedFields) => updateProductVariant(variants, setVariants, id, updatedFields)}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default VariableTabContent
