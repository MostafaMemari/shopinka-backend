import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Controller } from 'react-hook-form'
import { RobotsTag } from '@/types/enums/robotsTag'
import SeoKeywordsInputWithProps from './SeoKeywordsInputWithProps'
import { styled } from '@mui/material/styles'

interface SeoFormProps {
  control: any
  errors: any
  setValue: any
  isLoading?: boolean
}

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}))

const SeoFormWithProps: React.FC<SeoFormProps> = ({ control, errors, setValue, isLoading = false }) => {
  return (
    <FormContainer>
      <Typography className='font-medium'>تنظیمات سئو</Typography>
      <Grid container spacing={6}>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_title'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='عنوان سئو'
                placeholder='عنوان صفحه (60-70 کاراکتر)'
                error={!!errors.seo_title}
                helperText={errors.seo_title?.message ? String(errors.seo_title.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_description'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                multiline
                rows={4}
                label='توضیحات سئو'
                placeholder='توضیحات برای موتورهای جستجو (160-200 کاراکتر)'
                error={!!errors.seo_description}
                helperText={errors.seo_description?.message ? String(errors.seo_description.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <SeoKeywordsInputWithProps control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_canonicalUrl'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='آدرس کانونیکال'
                placeholder='https://example.com/slug'
                error={!!errors.seo_canonicalUrl}
                helperText={errors.seo_canonicalUrl?.message ? String(errors.seo_canonicalUrl.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_ogTitle'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='عنوان اوپن‌گراف'
                placeholder='عنوان برای شبکه‌های اجتماعی'
                error={!!errors.seo_ogTitle}
                helperText={errors.seo_ogTitle?.message ? String(errors.seo_ogTitle.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_ogDescription'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                multiline
                rows={4}
                label='توضیحات اوپن‌گراف'
                placeholder='توضیح برای شبکه‌های اجتماعی'
                error={!!errors.seo_ogDescription}
                helperText={errors.seo_ogDescription?.message ? String(errors.seo_ogDescription.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_ogImage'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='تصویر اوپن‌گراف'
                placeholder='https://example.com/image.jpg'
                error={!!errors.seo_ogImage}
                helperText={errors.seo_ogImage?.message ? String(errors.seo_ogImage.message) : undefined}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <Controller
            name='seo_robotsTag'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='دستورات ربات‌ها'
                error={!!errors.seo_robotsTag}
                helperText={errors.seo_robotsTag?.message ? String(errors.seo_robotsTag.message) : undefined}
                disabled={isLoading}
              >
                <MenuItem value={RobotsTag.INDEX_FOLLOW}>Index, Follow</MenuItem>
                <MenuItem value={RobotsTag.NOINDEX_FOLLOW}>Noindex, Follow</MenuItem>
                <MenuItem value={RobotsTag.INDEX_NOFOLLOW}>Index, Nofollow</MenuItem>
                <MenuItem value={RobotsTag.NOINDEX_NOFOLLOW}>Noindex, Nofollow</MenuItem>
              </CustomTextField>
            )}
          />
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default SeoFormWithProps
