import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useFormContext } from 'react-hook-form'
import SeoKeywordsInput from './SeoKeywords'

const SeoForm: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className='flex flex-col gap-4'>
      <Typography className='font-medium'>تنظیمات سئو</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='عنوان سئو'
            placeholder='عنوان صفحه'
            {...register('seo_title')}
            error={!!errors.seo_title}
            helperText={errors.seo_title?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            multiline
            rows={3}
            label='توضیحات سئو'
            placeholder='توضیحات برای موتورهای جستجو'
            {...register('seo_description')}
            error={!!errors.seo_description}
            helperText={errors.seo_description?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SeoKeywordsInput />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='آدرس کانونیکال'
            placeholder='https://example.com/slug'
            {...register('seo_canonicalUrl')}
            error={!!errors.seo_canonicalUrl}
            helperText={errors.seo_canonicalUrl?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='عنوان اوپن‌گراف'
            placeholder='برای اشتراک در شبکه‌های اجتماعی'
            {...register('seo_ogTitle')}
            error={!!errors.seo_ogTitle}
            helperText={errors.seo_ogTitle?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            multiline
            rows={3}
            label='توضیحات اوپن‌گراف'
            placeholder='توضیح شبکه‌های اجتماعی'
            {...register('seo_ogDescription')}
            error={!!errors.seo_ogDescription}
            helperText={errors.seo_ogDescription?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='تصویر اوپن‌گراف'
            placeholder='https://...'
            {...register('seo_ogImage')}
            error={!!errors.seo_ogImage}
            helperText={errors.seo_ogImage?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            select
            fullWidth
            label='دستورات ربات‌ها'
            defaultValue='index, follow'
            {...register('seo_robotsTag')}
            error={!!errors.seo_robotsTag}
            helperText={errors.seo_robotsTag?.message?.toString()}
          >
            <MenuItem value='index, follow'>Index, Follow</MenuItem>
            <MenuItem value='noindex, follow'>Noindex, Follow</MenuItem>
            <MenuItem value='index, nofollow'>Index, Nofollow</MenuItem>
            <MenuItem value='noindex, nofollow'>Noindex, Nofollow</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </div>
  )
}

export default SeoForm
