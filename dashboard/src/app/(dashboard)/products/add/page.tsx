'use client'

// Component Imports
import ProductAddHeader from '@/views/pages/products/add/ProductAddHeader'
import ProductCategories from '@/views/pages/products/add/ProductCategories'
import ProductGallery from '@/views/pages/products/add/ProductGallery'
import ProductInformation from '@/views/pages/products/add/ProductInformation'
import ProductMainImage from '@/views/pages/products/add/ProductMainImage'
import ProductPricing from '@/views/pages/products/add/ProductPricing'
import ProductTabs from '@/views/pages/products/add/tabs/ProductTabs'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid2'
import { FormProvider, useForm } from 'react-hook-form'

import { productSchema } from '@/libs/validators/product.schema'

const AppProduct = () => {
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      type: 'SIMPLE'
    },
    mode: 'onChange'
  })

  const onButtonClick = (buttonType: 'cancel' | 'draft' | 'publish') => {
    console.log(`دکمه ${buttonType} کلیک شد`)
  }

  const onSubmit = methods.handleSubmit(
    data => {
      console.log('📦 اطلاعات محصول:', data)
    },

    errors => {
      console.error('🚨 Error:', errors)
    }
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductAddHeader onButtonClick={onButtonClick} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <ProductInformation />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ProductTabs />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <ProductPricing />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ProductMainImage />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ProductGallery />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ProductCategories />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default AppProduct
