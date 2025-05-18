'use client'

import { useState, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
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
import { QueryKeys } from '@/types/enums/query-keys'

const updateProductVariant = (
  variants: ProductVariant[],
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>,
  id: string,
  updatedFields: Partial<ProductVariant>,
  queryClient: any
) => {
  setVariants(prevVariants => prevVariants.map(variant => (String(variant.id) === id ? { ...variant, ...updatedFields } : variant)))

  // Update query cache
  queryClient.setQueryData([QueryKeys.ProductVariants, { productId: variants[0]?.productId }], (oldData: any) => {
    if (!oldData?.data?.items) return oldData

    return {
      ...oldData,
      data: {
        ...oldData.data,
        items: oldData.data.items.map((item: ProductVariant) => (String(item.id) === id ? { ...item, ...updatedFields } : item))
      }
    }
  })
}

const VariableTabContent = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const queryClient = useQueryClient()

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
    setVariants(ProductVariants)
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
              onUpdate={(id, updatedFields) => updateProductVariant(variants, setVariants, id, updatedFields, queryClient)}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default VariableTabContent
