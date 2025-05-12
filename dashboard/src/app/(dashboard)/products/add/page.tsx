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
import { useState } from 'react'

const AppProduct = () => {
  const [submitType, setSubmitType] = useState<'cancel' | 'draft' | 'publish' | null>(null)

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      type: 'SIMPLE'
    },
    mode: 'onChange'
  })

  const onSubmit = methods.handleSubmit(
    data => {
      console.log('📦 اطلاعات محصول:', data)
      console.log('📤 نوع دکمه کلیک‌شده:', submitType)

      // TODO: call API or handle logic based on `submitType`
    },
    errors => {
      console.error('🚨 خطاهای اعتبارسنجی:', errors)
    }
  )

  const handleButtonClick = (type: 'cancel' | 'draft' | 'publish') => {
    setSubmitType(type)

    if (type === 'cancel') {
      console.log('🟥 لغو شد')

      // مثلاً: router.back() یا reset()

      return
    }

    if (type === 'draft') {
      console.log('📝 ذخیره به‌عنوان پیش‌نویس')
      onSubmit()

      return
    }

    // فقط برای publish نیاز به سابمیت واقعی داریم
    // type="submit" دکمه‌ی منتشر، خودش اینو هندل می‌کنه
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductAddHeader onButtonClick={handleButtonClick} />
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
