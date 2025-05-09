import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import CustomTextField from '@core/components/mui/TextField'

const RestockTab: React.FC = () => {
  return (
    <TabPanel value='restock' className='flex flex-col gap-4'>
      <Typography className='font-medium'>موجودی</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField fullWidth label='تعداد' placeholder='۵۴' type='number' />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField fullWidth label='وزن (کیلوگرم)' placeholder='۰.۵' type='number' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField fullWidth label='عرض (سانتی‌متر)' placeholder='۱۰' type='number' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField fullWidth label='ارتفاع (سانتی‌متر)' placeholder='۱۵' type='number' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField fullWidth label='طول (سانتی‌متر)' placeholder='۲۰' type='number' />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default RestockTab
