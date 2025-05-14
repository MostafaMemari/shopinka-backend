'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid2'
import ProductAddHeader from '@/views/pages/products/add/sections/ProductAddHeader'
import ProductCategories from '@/views/pages/products/add/sections/ProductCategories'
import ProductGallery from '@/views/pages/products/add/sections/ProductGallery'
import ProductInformation from '@/views/pages/products/add/sections/ProductInformation'
import ProductMainImage from '@/views/pages/products/add/sections/ProductMainImage'
import ProductPricing from '@/views/pages/products/add/sections/ProductPricing'
import ProductTabs from '@/views/pages/products/add/tabs/ProductTabs'
import { useProductForm } from '@/hooks/reactQuery/useProduct'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from '@/libs/validators/product.schema'
import { type InferType } from 'yup'
import { ProductStatus, ProductType } from '@/types/app/product.type'
import { RobotsTag } from '@/types/enums/robotsTag'
import LoadingSpinner from '@/components/LoadingSpinner'

type ProductFormType = InferType<typeof productFormSchema>

const ProductForm = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null

  const methods = useForm<ProductFormType>({
    resolver: yupResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: {
      sku: '',
      name: '',
      slug: '',
      description: null,
      shortDescription: null,
      quantity: null,
      basePrice: null,
      salePrice: null,
      status: ProductStatus.DRAFT,
      type: ProductType.SIMPLE,
      mainImageId: null,
      galleryImageIds: [],
      categoryIds: [],
      attributeIds: [],
      width: null,
      height: null,
      length: null,
      weight: null,
      seo_title: null,
      seo_description: null,
      seo_keywords: null,
      seo_canonicalUrl: null,
      seo_ogTitle: null,
      seo_ogDescription: null,
      seo_ogImage: null,
      seo_robotsTag: RobotsTag.INDEX_FOLLOW
    }
  })

  const { isLoading, handleButtonClick } = useProductForm({ id, methods })

  if (isLoading) return <LoadingSpinner />

  return (
    <FormProvider {...methods}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <ProductAddHeader onButtonClick={handleButtonClick} isLoading={isLoading} />
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
    </FormProvider>
  )
}

export default ProductForm
