'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Hooks
import { useFormContext, Controller } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'

const ProductInformation = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Card>
      <CardHeader title='اطلاعات محصول' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <CustomTextField fullWidth label='نام محصول' placeholder='آیفون ۱۴' {...register('name')} error={!!errors.name} helperText={errors.name?.message?.toString()} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField fullWidth label='کد SKU' placeholder='FXSK123U' {...register('sku')} error={!!errors.sku} helperText={errors.sku?.message?.toString()} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField fullWidth label='اسلاگ' placeholder='iphone-14' {...register('slug')} error={!!errors.slug} helperText={errors.slug?.message?.toString()} />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='shortDescription'
              control={control}
              render={({ field }) => (
                <RichTextEditor label='توضیحات کوتاه (اختیاری)' placeholder='توضیحات کوتاه محصول' value={field.value || ''} onChange={field.onChange} height='50px' />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات محصول' value={field.value || ''} onChange={field.onChange} />}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
