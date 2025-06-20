'use client'

import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import CustomTextField from '@core/components/mui/TextField'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { type PageForm, Page } from '@/types/app/page.type'

interface PageFormProps {
  control: any
  errors: any
  isLoading: boolean
}

const PageForm = ({ control, errors, isLoading }: PageFormProps) => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={6}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='نام'
                  placeholder='نام برگه را وارد کنید'
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                  aria-describedby='name-error'
                />
              )}
            />
            <Controller
              name='slug'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='نامک (Slug)'
                  placeholder='نامک برگه را وارد کنید'
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                  disabled={isLoading}
                  aria-describedby='slug-error'
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات برگه' value={field.value || ''} onChange={field.onChange} />}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default PageForm
