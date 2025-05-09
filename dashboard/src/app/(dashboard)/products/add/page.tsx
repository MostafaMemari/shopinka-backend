// Component Imports
import ProductAddHeader from '@/views/pages/products/add/ProductAddHeader'
import ProductCategories from '@/views/pages/products/add/ProductCategories'
import ProductGallery from '@/views/pages/products/add/ProductGallery'
import ProductInformation from '@/views/pages/products/add/ProductInformation'
import ProductMainImage from '@/views/pages/products/add/ProductMainImage'
import ProductPricing from '@/views/pages/products/add/ProductPricing'
import ProductTab from '@/views/pages/products/add/tabs/ProductForm'
import Grid from '@mui/material/Grid2'

const eCommerceProductsAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductAddHeader />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductInformation />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductTab />
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
  )
}

export default eCommerceProductsAdd
