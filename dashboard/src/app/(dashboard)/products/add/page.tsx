// Component Imports
import ProductAddHeader from '@/views/pages/products/add/ProductAddHeader'
import ProductInformation from '@/views/pages/products/add/ProductInformation'
import ProductOrganize from '@/views/pages/products/add/ProductOrganize'
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
          {/* <Grid size={{ xs: 12 }}>
            <ProductImage />
          </Grid> */}
          {/* <Grid size={{ xs: 12 }}>
            <ProductVariants />
          </Grid> */}
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
            <ProductOrganize />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsAdd
