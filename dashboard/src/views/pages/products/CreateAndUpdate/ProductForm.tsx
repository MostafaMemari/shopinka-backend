'use client'

import { FormProvider } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid2'
import ProductAddHeader from '@/views/pages/products/CreateAndUpdate/sections/ProductAddHeader'
import { useProductForm } from '@/hooks/reactQuery/useProduct'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProductFormTabs from './ProductFormTabs'

const ProductForm = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null
  const { isLoading, handleButtonClick, isUpdate, methods } = useProductForm({ id })
  const productType = methods.watch('type')

  if (isLoading) return <LoadingSpinner />

  return (
    <FormProvider {...methods}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <ProductAddHeader onButtonClick={handleButtonClick} isLoading={isLoading} isUpdate={isUpdate} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ProductFormTabs productType={productType} id={id} />
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default ProductForm
