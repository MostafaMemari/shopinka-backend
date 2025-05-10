import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useFormContext } from 'react-hook-form'

const SeoTab: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext()

  // تبدیل رشته کلمات کلیدی به آرایه و بالعکس
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const keywords = value
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)

    setValue('seo_keywords', keywords.length > 0 ? keywords : undefined)
  }

  return (
    <TabPanel value='seo' className='flex flex-col gap-4'>
      <Typography className='font-medium'>تنظیمات سئو</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='عنوان سئو'
            placeholder='عنوان صفحه محصول'
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
            placeholder='توضیحات کوتاه برای موتورهای جستجو'
            {...register('seo_description')}
            error={!!errors.seo_description}
            helperText={errors.seo_description?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='کلمات کلیدی سئو'
            placeholder='کلمه کلیدی ۱, کلمه کلیدی ۲'
            onChange={handleKeywordsChange}
            defaultValue={getValues('seo_keywords')?.join(', ') || ''}
            error={!!errors.seo_keywords}
            helperText={errors.seo_keywords?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='آدرس کانونیکال سئو'
            placeholder='https://example.com/product'
            {...register('seo_canonicalUrl')}
            error={!!errors.seo_canonicalUrl}
            helperText={errors.seo_canonicalUrl?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='عنوان اوپن‌گراف سئو'
            placeholder='عنوان برای اشتراک در شبکه‌های اجتماعی'
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
            label='توضیحات اوپن‌گراف سئو'
            placeholder='توضیحات برای اشتراک در شبکه‌های اجتماعی'
            {...register('seo_ogDescription')}
            error={!!errors.seo_ogDescription}
            helperText={errors.seo_ogDescription?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='تصویر اوپن‌گراف سئو'
            placeholder='آدرس تصویر (URL)'
            {...register('seo_ogImage')}
            error={!!errors.seo_ogImage}
            helperText={errors.seo_ogImage?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            select
            fullWidth
            label='دستورات ربات‌های سئو'
            defaultValue='index,follow'
            {...register('seo_robotsTag')}
            error={!!errors.seo_robotsTag}
            helperText={errors.seo_robotsTag?.message?.toString()}
          >
            <MenuItem value='index,follow'>Index, Follow</MenuItem>
            <MenuItem value='noindex,nofollow'>Noindex, Nofollow</MenuItem>
            <MenuItem value='index,nofollow'>Index, Nofollow</MenuItem>
            <MenuItem value='noindex,follow'>Noindex, Follow</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default SeoTab
