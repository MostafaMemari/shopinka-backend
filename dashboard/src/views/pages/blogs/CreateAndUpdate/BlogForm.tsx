'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid2'
import BlogAddHeader from '@/views/pages/blogs/CreateAndUpdate/sections/BlogAddHeader'
import BlogCategories from '@/views/pages/blogs/CreateAndUpdate/sections/BlogCategories'
import BlogInformation from '@/views/pages/blogs/CreateAndUpdate/sections/BlogInformation'
import BlogMainImage from '@/views/pages/blogs/CreateAndUpdate/sections/BlogMainImage'
import BlogTabs from '@/views/pages/blogs/CreateAndUpdate/tabs/BlogTabs'
import { yupResolver } from '@hookform/resolvers/yup'
import { type InferType } from 'yup'
import { RobotsTag } from '@/types/enums/robotsTag'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BlogStatus } from '@/types/app/blog.type'
import { blogFormSchema } from '@/libs/validators/blog.schema'
import { useBlogForm } from '@/hooks/reactQuery/useBlog'

type BlogFormType = InferType<typeof blogFormSchema>

const BlogForm = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null

  const methods = useForm<BlogFormType>({
    resolver: yupResolver(blogFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      content: null,
      status: BlogStatus.DRAFT,
      categoryIds: [],
      readingTime: null,

      seo_title: null,
      seo_description: null,
      seo_keywords: null,
      seo_canonicalUrl: null,
      seo_ogTitle: null,
      seo_ogDescription: null,
      seo_ogImage: null,
      seo_robotsTag: RobotsTag.INDEX_FOLLOW
    }
  })

  const { isLoading, handleButtonClick, isUpdate } = useBlogForm({ id, methods })

  if (isLoading) return <LoadingSpinner />

  return (
    <FormProvider {...methods}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <BlogAddHeader onButtonClick={handleButtonClick} isLoading={isLoading} isUpdate={isUpdate} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <BlogInformation />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <BlogTabs />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <BlogMainImage />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <BlogCategories />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default BlogForm
