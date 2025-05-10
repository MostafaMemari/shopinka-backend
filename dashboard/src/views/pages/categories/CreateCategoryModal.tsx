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

// Types
interface CreateCategoryModalProps {
  children: ReactNode
}

const CreateCategoryModal = ({ children }: CreateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
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
    if (isDirty && !confirm('آیا مطمئن هستید که می‌خواهید بدون ذخیره خارج شوید؟')) {
      return
    }

    setOpen(false)
    reset()
  }, [isDirty, reset])

  const onSubmit = useCallback(
    async (formData: CategoryForm) => {
      setIsLoading(true)

      try {
        const cleanedData = cleanObject(formData)

        const { status, data } = await createCategory(cleanedData)

        if (status === 201 && data) {
          showToast({ type: 'success', message: 'دسته‌بندی با موفقیت ایجاد شد' })
          queryClient.invalidateQueries({ queryKey: ['categories'] })
          handleClose()
        }
      } catch (error: any) {
        showToast({
          type: 'error',
          message: error?.data?.message || 'خطایی در ایجاد دسته‌بندی رخ داد'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [queryClient, handleClose]
  )

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ایجاد دسته‌بندی'>
        {children}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='افزودن دسته‌بندی جدید'
        defaultMaxWidth='md'
        actions={
          <>
            <Button onClick={handleClose} color='secondary' disabled={isLoading}>
              انصراف
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}>
              {isLoading ? 'در حال ثبت...' : 'ثبت'}
            </Button>
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

                <Controller
                  name='parentId'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      value={field.value ?? ''}
                      fullWidth
                      type='number'
                      label='شناسه والد (اختیاری)'
                      placeholder='شناسه دسته‌بندی والد'
                      error={!!errors.parentId}
                      helperText={errors.parentId?.message}
                      disabled={isLoading}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      aria-describedby='parentId-error'
                    />
                  )}
                />

                <Controller
                  name='thumbnailImageId'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      value={field.value ?? ''}
                      fullWidth
                      type='number'
                      label='شناسه تصویر بندانگشتی (اختیاری)'
                      placeholder='شناسه تصویر بندانگشتی'
                      error={!!errors.thumbnailImageId}
                      helperText={errors.thumbnailImageId?.message}
                      disabled={isLoading}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      aria-describedby='thumbnailImageId-error'
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    multiline
                    rows={8}
                    label='توضیحات'
                    placeholder='توضیحات دسته‌بندی را وارد کنید'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={isLoading}
                    onChange={e => field.onChange(e.target.value || null)}
                    aria-describedby='description-error'
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateCategoryModal
