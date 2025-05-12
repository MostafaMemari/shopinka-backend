'use client'

// React Imports
import { useState, useCallback, ReactNode } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'

// Form Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// API and Utility Imports
import { showToast } from '@/utils/showToast'
import { useQueryClient } from '@tanstack/react-query'
import { categorySchema } from '@/libs/validators/category.schemas'
import { createCategory } from '@/libs/api/category'
import { CategoryForm } from '@/types/category'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import { errorCategoryMessage } from '@/messages/auth/categoryMessages.'
import ParentCategorySelect from './ParentCategorySelect'
import CategoryThumbnailImage from './CategoryThumbnailImage'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/query-keys'
import FormActions from '@/components/FormActions'

interface CreateCategoryModalProps {
  children?: ReactNode
}

const CreateCategoryModal = ({ children }: CreateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CategoryForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: null,
      parentId: null,
      thumbnailImageId: null
    },
    resolver: yupResolver(categorySchema)
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: CategoryForm) => {
      setIsLoading(true)

      try {
        const cleanedData = cleanObject(formData)
        const { status } = await createCategory(cleanedData)

        const errorMessage = handleApiError(status, errorCategoryMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })

          return
        }

        if (status === 201 || status === 200) {
          showToast({ type: 'success', message: 'دسته‌بندی با موفقیت ایجاد شد' })
          invalidate(QueryKeys.Categories)
          handleClose()
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, invalidate]
  )

  return (
    <div>
      {children || (
        <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />}>
          ثبت دسته‌بندی جدید
        </Button>
      )}

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='افزودن دسته‌بندی جدید'
        defaultMaxWidth='lg'
        actions={
          <>
            <FormActions onCancel={handleClose} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
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
                <ParentCategorySelect control={control} errors={errors} isLoading={isLoading} />

                <CategoryThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={false} />
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات محصول' value={field.value || ''} onChange={field.onChange} />}
              />
            </Grid>
          </Grid>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateCategoryModal
