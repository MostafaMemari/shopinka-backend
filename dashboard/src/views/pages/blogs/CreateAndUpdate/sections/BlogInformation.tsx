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

const BlogInformation = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Card>
      <CardHeader title='اطلاعات بلاگ' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              fullWidth
              label='عنوان بلاگ'
              placeholder='معرفی فناوری‌های جدید'
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField fullWidth label='نامک' placeholder='new-tech-intro' {...register('slug')} error={!!errors.slug} helperText={errors.slug?.message?.toString()} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField
              fullWidth
              label='زمان مطالعه (دقیقه)'
              placeholder='5'
              type='number'
              {...register('readingTime')}
              error={!!errors.readingTime}
              helperText={errors.readingTime?.message?.toString()}
            />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='content'
              control={control}
              render={({ field }) => (
                <RichTextEditor label='محتوای بلاگ (اختیاری)' placeholder='محتوای بلاگ را اینجا بنویسید' value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BlogInformation
