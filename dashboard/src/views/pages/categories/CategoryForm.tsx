'use client'

import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import CustomTextField from '@core/components/mui/TextField'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import ParentCategorySelect from './ParentCategorySelect'
import CategoryThumbnailImage from './CategoryThumbnailImage'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { Category, CategoryType } from '@/types/app/category.type'
import SeoFormWithProps from '@/components/seo/props/SeoFormWithProps'
import { MenuItem } from '@mui/material'

interface CategoryFormProps {
  control: any
  errors: any
  setValue: any
  isLoading: boolean
  initialData?: Category
}

const CategoryForm = ({ control, errors, setValue, isLoading, initialData }: CategoryFormProps) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label='category form tabs'>
          <Tab label='اطلاعات اصلی' id='tab-0' aria-controls='tabpanel-0' />
          <Tab label='سئو' id='tab-1' aria-controls='tabpanel-1' />
        </Tabs>
      </Box>
      <Box sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CategoryThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} category={initialData} />
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

                <Controller
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField {...field} select fullWidth label='نوع دسته‌بندی' error={!!errors.type} helperText={errors.type?.message} disabled={isLoading}>
                      <MenuItem value={CategoryType.PRODUCT}>محصول</MenuItem>
                      <MenuItem value={CategoryType.BLOG}>وبلاگ</MenuItem>
                    </CustomTextField>
                  )}
                />

                <ParentCategorySelect control={control} errors={errors} isLoading={isLoading} />
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
        )}
        {tabValue === 1 && (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <SeoFormWithProps control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  )
}

export default CategoryForm
