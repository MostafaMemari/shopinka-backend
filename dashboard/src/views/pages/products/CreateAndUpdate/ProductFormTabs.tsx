'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import ProductInformation from '@/views/pages/products/CreateAndUpdate/sections/ProductInformation'
import ProductTabs from '@/views/pages/products/CreateAndUpdate/tabs/ProductTabs'
import ProductPricing from '@/views/pages/products/CreateAndUpdate/sections/ProductPricing'
import ProductMainImage from '@/views/pages/products/CreateAndUpdate/sections/ProductMainImage'
import ProductGallery from '@/views/pages/products/CreateAndUpdate/sections/ProductGallery'
import ProductCategories from '@/views/pages/products/CreateAndUpdate/sections/ProductCategories'
import SeoTabContent from '@/views/pages/products/CreateAndUpdate/SeoTabContent'
import VariableTabContent from '@/views/pages/products/CreateAndUpdate/variants/VariableTabContent'
import { ProductType } from '@/types/app/product.type'
import ProductTags from './sections/ProductTags'

interface ProductFormTabsProps {
  productType: ProductType
  id: number | null
}

const ProductFormTabs = ({ productType, id }: ProductFormTabsProps) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label='product form tabs'>
          <Tab label='اطلاعات اصلی' id='tab-0' aria-controls='tabpanel-0' />
          <Tab label='سئو' id='tab-1' aria-controls='tabpanel-1' />
          {id && productType === ProductType.VARIABLE && <Tab label='متغیر محصول' id='tab-2' aria-controls='tabpanel-2' />}
        </Tabs>
      </Box>
      <Grid container spacing={6}>
        {tabValue === 0 && (
          <>
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
                <Grid size={{ xs: 12 }}>
                  <ProductTags />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {tabValue === 1 && (
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <SeoTabContent />
              </Grid>
            </Grid>
          </Grid>
        )}
        {tabValue === 2 && id && productType === ProductType.VARIABLE && (
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariableTabContent />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default ProductFormTabs
