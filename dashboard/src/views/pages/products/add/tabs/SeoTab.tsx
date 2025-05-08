import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'

const SeoTab: React.FC = () => {
  return (
    <TabPanel value='seo' className='flex flex-col gap-4'>
      <Typography className='font-medium'>تنظیمات سئو</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth label='عنوان متا' placeholder='عنوان صفحه محصول' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth multiline rows={3} label='توضیحات متا' placeholder='توضیحات کوتاه برای موتورهای جستجو' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth label='کلمات کلیدی متا' placeholder='کلمه کلیدی ۱, کلمه کلیدی ۲' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth label='آدرس کانونیکال' placeholder='https://example.com/product' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth label='عنوان اوپن‌گراف' placeholder='عنوان برای اشتراک در شبکه‌های اجتماعی' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth multiline rows={3} label='توضیحات اوپن‌گراف' placeholder='توضیحات برای اشتراک در شبکه‌های اجتماعی' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField fullWidth label='تصویر اوپن‌گراف' placeholder='آدرس تصویر (URL)' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField select fullWidth label='دستورات ربات‌ها' defaultValue='index,follow'>
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
