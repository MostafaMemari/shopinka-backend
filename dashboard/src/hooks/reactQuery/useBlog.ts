'use client'

import { createBlog, getBlogById, getBlogs, updateBlog } from '@/libs/api/blog.api'
import { Blog, BlogForm, BlogStatus } from '@/types/app/blog.type'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { cleanObject } from '@/utils/getChangedFields'
import { showToast } from '@/utils/showToast'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useFormSubmit } from '../useFormSubmit'
import { GalleryItem } from '@/types/app/gallery.type'
import { useForm } from 'react-hook-form'
import { blogFormSchema } from '@/libs/validators/blog.schema'
import { errorBlogMessage } from '@/messages/blog.message'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { RobotsTag } from '@/types/enums/robotsTag'

export function useBlogs({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchBlogs = () => getBlogs(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Blogs, params],
    queryFn: fetchBlogs,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseBlogFormProps {
  id?: number | null
  initialData?: Blog
}

export const useBlogForm = ({ id, initialData }: UseBlogFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(!!id)
  const [initialBlog, setInitialBlog] = useState<Blog | null>(null)
  const isUpdate = !!id || !!initialData

  const methods = useForm<BlogForm>({
    resolver: yupResolver<BlogForm, any, any>(blogFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      content: null,
      status: BlogStatus.DRAFT,
      categoryIds: [],
      tagIds: [],
      readingTime: null,

      seo_title: '',
      seo_description: '',
      seo_keywords: [],
      seo_canonicalUrl: '',
      seo_ogTitle: '',
      seo_ogDescription: '',
      seo_ogImage: null,
      seo_robotsTag: RobotsTag.INDEX_FOLLOW
    }
  })

  useEffect(() => {
    if (id && !initialData) {
      setIsLoading(true)
      getBlogById(id)
        .then(response => {
          const blog = response.data

          setInitialBlog(blog)

          if (blog) {
            Object.entries(blog).forEach(([key, value]) => {
              if (key in methods.getValues() && typeof value !== 'object') {
                methods.setValue(key as keyof BlogForm, value ?? null)
              }
            })

            if (blog.seoMeta) {
              methods.setValue('seo_title', blog.seoMeta.title)
              methods.setValue('seo_description', blog.seoMeta.description)
              methods.setValue('seo_keywords', blog.seoMeta.keywords)
              methods.setValue('seo_canonicalUrl', blog.seoMeta.canonicalUrl)
              methods.setValue('seo_ogTitle', blog.seoMeta.ogTitle)
              methods.setValue('seo_ogDescription', blog.seoMeta.ogDescription)
              methods.setValue('seo_ogImage', blog.seoMeta.ogImage)
              methods.setValue('seo_robotsTag', blog.seoMeta.robotsTag)
            }

            if (blog.mainImage) {
              methods.setValue('mainImage' as any, blog.mainImage as GalleryItem)
            }

            methods.setValue('categoryIds', blog.categories?.map(category => category.id) || [])
            methods.setValue('tagIds', blog.tags?.map(tag => tag.id) || [])
          }
        })
        .catch(() => {
          showToast({ type: 'error', message: 'خطا در بارگذاری بلاگ' })
        })
        .finally(() => setIsLoading(false))
    } else if (initialData) {
      setInitialBlog(initialData)
      Object.entries(initialData).forEach(([key, value]) => {
        if (key in methods.getValues() && typeof value !== 'object') {
          methods.setValue(key as keyof BlogForm, value ?? null)
        }
      })

      if (initialData.mainImage) {
        methods.setValue('mainImage' as any, initialData.mainImage as GalleryItem)
      }

      methods.setValue('categoryIds', initialData.categoryIds || [])

      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [id, initialData, methods, router])

  const { isLoading: submitLoading, onSubmit: submitForm } = useFormSubmit<BlogForm & { id?: string }>({
    createApi: async (formData: BlogForm) => {
      const response = await createBlog(formData as unknown as Blog)

      return { status: response.status, data: { id: response.data?.blog?.id } }
    },
    updateApi: async (blogId: string, formData: Partial<BlogForm>) => {
      if (!id) throw new Error('Blog ID is required for update')

      return updateBlog(Number(blogId), formData as unknown as Partial<Blog>)
    },

    errorMessages: errorBlogMessage,
    queryKey: QueryKeys.Blogs,
    successMessage: isUpdate ? 'بلاگ با موفقیت به‌روزرسانی شد' : 'بلاگ با موفقیت ایجاد شد',
    initialData: initialBlog
      ? {
          ...initialBlog,
          id: String(initialBlog.id),
          categoryIds: initialBlog.categories?.map(category => category.id) || [],
          tagIds: initialBlog.tags?.map(tag => tag.id) || []
        }
      : id
        ? { id: String(id) }
        : undefined,
    isUpdate
  })

  const handleButtonClick = useCallback(
    async (type: 'cancel' | 'draft' | 'publish') => {
      if (type === 'cancel') {
        router.push('/blogs')

        return
      }

      await methods
        .handleSubmit(async (data: BlogForm) => {
          setIsLoading(true)
          const status = type === 'publish' ? BlogStatus.PUBLISHED : BlogStatus.DRAFT

          const cleanedData = cleanObject({
            ...data,
            status,
            categoryIds: data.categoryIds ?? [],
            mainImageId: data.mainImageId ?? null
          })

          const response = await submitForm(cleanedData, () => router.refresh())

          if (response?.status === 201) router.replace(`/blogs/edit?id=${response.data?.id}`)
        })()
        .finally(() => setIsLoading(false))
    },
    [methods, submitForm, router]
  )

  return {
    isLoading: isLoading || submitLoading,
    handleButtonClick,
    isUpdate,
    methods
  }
}
