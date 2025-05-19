'use client'

import { FormProvider } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid2'
import BlogAddHeader from '@/views/pages/blogs/CreateAndUpdate/sections/BlogAddHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useBlogForm } from '@/hooks/reactQuery/useBlog'
import BlogFormTabs from './BlogFormTabs'

const BlogForm = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null

  const { isLoading, handleButtonClick, isUpdate, methods } = useBlogForm({ id })

  if (isLoading) return <LoadingSpinner />

  return (
    <FormProvider {...methods}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <BlogAddHeader onButtonClick={handleButtonClick} isLoading={isLoading} isUpdate={isUpdate} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <BlogFormTabs />
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default BlogForm
