'use client'

import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import CustomTextField from '@core/components/mui/TextField'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import TagThumbnailImage from './TagThumbnailImage'
import { type TagForm, Tag, TagType } from '@/types/app/tag.type'
import { MenuItem } from '@mui/material'

interface TagFormProps {
  control: any
  errors: any
  setValue: any
  isLoading: boolean
  initialData?: Tag
}

const TagForm = ({ control, errors, setValue, isLoading, initialData }: TagFormProps) => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TagThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} tag={initialData} />

          <Grid container spacing={6}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='نام'
                  placeholder='نام برچسب را وارد کنید'
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
                  placeholder='نامک برچسب را وارد کنید'
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                  disabled={isLoading}
                  aria-describedby='slug-error'
                />
              )}
            />

            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <CustomTextField {...field} select fullWidth label='نوع دسته‌بندی' error={!!errors.type} helperText={errors.type?.message} disabled={isLoading}>
                  <MenuItem value={TagType.PRODUCT}>محصول</MenuItem>
                  <MenuItem value={TagType.BLOG}>وبلاگ</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات برچسب' value={field.value || ''} onChange={field.onChange} />}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default TagForm
