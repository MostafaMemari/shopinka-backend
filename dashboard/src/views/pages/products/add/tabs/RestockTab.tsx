import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import CustomTextField from '@core/components/mui/TextField'
import { useFormContext } from 'react-hook-form'

const RestockTab: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <TabPanel value='restock' className='flex flex-col gap-4'>
      <Typography className='font-medium'>موجودی</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            fullWidth
            label='تعداد'
            placeholder='۵۴'
            type='number'
            {...register('quantity')}
            error={!!errors.quantity}
            helperText={errors.quantity?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            fullWidth
            label='وزن (کیلوگرم)'
            placeholder='۰.۵'
            type='number'
            {...register('weight')}
            error={!!errors.weight}
            helperText={errors.weight?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            label='عرض (سانتی‌متر)'
            placeholder='۱۰'
            type='number'
            {...register('width')}
            error={!!errors.width}
            helperText={errors.width?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            label='ارتفاع (سانتی‌متر)'
            placeholder='۱۵'
            type='number'
            {...register('height')}
            error={!!errors.height}
            helperText={errors.height?.message?.toString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            label='طول (سانتی‌متر)'
            placeholder='۲۰'
            type='number'
            {...register('length')}
            error={!!errors.length}
            helperText={errors.length?.message?.toString()}
          />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default RestockTab
