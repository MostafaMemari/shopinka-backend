import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Controller } from 'react-hook-form'
import SeoKeywordsInputWithProps from '@/components/seo/props/SeoKeywordsInputWithProps'

interface SeoFormProps {
  control: any
  errors: any
  setValue: any
  isLoading?: boolean
}

const SeoFormWithProps: React.FC<SeoFormProps> = ({ control, errors, setValue, isLoading = false }) => {
  return (
    <div className='flex flex-col gap-4 mt-6'>
      <Typography className='font-medium' variant='h6'>
        تنظیمات سئو
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_title'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='عنوان سئو'
                placeholder='عنوان صفحه'
                error={!!errors.seo_title}
                helperText={errors.seo_title?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_description'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='توضیحات سئو'
                placeholder='توضیحات برای موتورهای جستجو'
                error={!!errors.seo_description}
                helperText={errors.seo_description?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SeoKeywordsInputWithProps control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_canonicalUrl'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='آدرس کانونیکال'
                placeholder='https://example.com/slug'
                error={!!errors.seo_canonicalUrl}
                helperText={errors.seo_canonicalUrl?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_ogTitle'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='عنوان اوپن‌گراف'
                placeholder='برای اشتراک در شبکه‌های اجتماعی'
                error={!!errors.seo_ogTitle}
                helperText={errors.seo_ogTitle?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_ogDescription'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='توضیحات اوپن‌گراف'
                placeholder='توضیح شبکه‌های اجتماعی'
                error={!!errors.seo_ogDescription}
                helperText={errors.seo_ogDescription?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_ogImage'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='تصویر اوپن‌گراف'
                placeholder='https://...'
                error={!!errors.seo_ogImage}
                helperText={errors.seo_ogImage?.message?.toString()}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='seo_robotsTag'
            control={control}
            defaultValue='index, follow'
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='دستورات ربات‌ها'
                error={!!errors.seo_robotsTag}
                helperText={errors.seo_robotsTag?.message?.toString()}
                disabled={isLoading}
              >
                <MenuItem value='index, follow'>Index, Follow</MenuItem>
                <MenuItem value='noindex, follow'>Noindex, Follow</MenuItem>
                <MenuItem value='index, nofollow'>Index, Nofollow</MenuItem>
                <MenuItem value='noindex, nofollow'>Noindex, Nofollow</MenuItem>
              </CustomTextField>
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SeoFormWithProps
