'use client'

import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import CustomTextField from '@core/components/mui/TextField'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import ParentCommentSelect from './ParentCommentSelect'
import CommentThumbnailImage from './CommentThumbnailImage'
import { type CommentForm, Comment } from '@/types/app/comment.type'

interface CommentFormProps {
  control: any
  errors: any
  setValue: any
  isLoading: boolean
  initialData?: Comment
}

const CommentForm = ({ control, errors, setValue, isLoading, initialData }: CommentFormProps) => {
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
                  placeholder='نام دسته‌بندی را وارد کنید'
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
                  placeholder='نامک دسته‌بندی را وارد کنید'
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                  disabled={isLoading}
                  aria-describedby='slug-error'
                />
              )}
            />
            <ParentCommentSelect control={control} errors={errors} isLoading={isLoading} />

            <CommentThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} comment.type={initialData} />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات دسته‌بندی' value={field.value || ''} onChange={field.onChange} />}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default CommentForm
