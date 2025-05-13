'use client'

// Component Imports
import ProductAddHeader from '@/views/pages/products/add/sections/ProductAddHeader'
import ProductCategories from '@/views/pages/products/add/sections/ProductCategories'
import ProductGallery from '@/views/pages/products/add/sections/ProductGallery'
import ProductInformation from '@/views/pages/products/add/sections/ProductInformation'
import ProductMainImage from '@/views/pages/products/add/sections/ProductMainImage'
import ProductPricing from '@/views/pages/products/add/sections/ProductPricing'
import ProductTabs from '@/views/pages/products/add/tabs/ProductTabs'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid2'
import { FormProvider, useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { type InferType } from 'yup'
import { ProductStatus, ProductType } from '@/types/app/product'
import { productSchema } from '@/libs/validators/product.schema'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import { showToast } from '@/utils/showToast'
import { QueryKeys } from '@/types/enums/query-keys'
import { createProduct, removeProduct } from '@/libs/api/product'
import { RobotsTag } from '@/types/enums/robotsTag'
import { saveSeoMeta } from '@/libs/api/seo'

const CreateProduct = () => {
  const [submitType, setSubmitType] = useState<'cancel' | 'draft' | 'publish' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { invalidate } = useInvalidateQuery()

  type ProductForm = InferType<typeof productSchema>

  const methods = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
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
    },
    mode: 'onChange'
  })

  const handleClose = useCallback(() => {
    // router.push('/products') // اگر از Next.js استفاده می‌کنید
    methods.reset()
  }, [methods])

  const onSubmit = methods.handleSubmit(data => {
    console.log('Submit Type:', submitType)
    console.log('📦 اطلاعات محصول:', data)
  })

  const handleButtonClick = useCallback(
    async (type: 'cancel' | 'draft' | 'publish') => {
      setSubmitType(type)

      if (type === 'cancel') {
        methods.reset()
        handleClose()

        return
      }

      await methods.handleSubmit(async data => {
        setIsLoading(true)

        try {
          const status = type === 'publish' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT

          const cleanedData = cleanObject({ ...data, status })

          const response = await createProduct(cleanedData)

          const errorMessage = handleApiError(response.status, {
            400: 'اطلاعات محصول نامعتبر است',
            409: 'محصول با این کد یا نامک قبلاً وجود دارد',
            500: 'خطای سرور رخ داد'
          })

          if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })

            return
          }

          if ((response.status === 201 || response.status === 200) && response.data?.product) {
            const productId = response.data.product.id

            console.log(cleanedData)

            const seoResponse = await saveSeoMeta('product', productId, {
              title: cleanedData.seo_title || cleanedData.name,
              description: cleanedData.seo_description || cleanedData?.shortDescription,
              keywords: cleanedData.seo_keywords,
              canonicalUrl: cleanedData.seo_canonicalUrl,
              ogTitle: cleanedData.seo_ogTitle || cleanedData.name,
              ogDescription: cleanedData.seo_ogDescription || cleanedData?.shortDescription,
              ogImage: cleanedData.seo_ogImage,
              robotsTag: 'index_follow'
            })

            console.log(seoResponse)

            if (seoResponse.status === 200 || (seoResponse.status === 201 && seoResponse.data?.seo)) {
              showToast({ type: 'success', message: `محصول با موفقیت ${type === 'publish' ? 'منتشر' : 'ذخیره'} شد` })

              invalidate(QueryKeys.Products)

              handleClose()
            } else {
              await removeProduct(productId.toString())

              showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
            }
          }
        } catch (error: any) {
          showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
        } finally {
          setIsLoading(false)
        }
      })()
    },
    [methods, handleClose, invalidate]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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
      </form>
    </FormProvider>
  )
}

export default CreateProduct
