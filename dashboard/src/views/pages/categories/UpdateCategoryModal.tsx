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
import { updateCategory } from '@/libs/api/category'
import { CategoryForm, Category } from '@/types/category'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import ParentCategorySelect from './ParentCategorySelect'
import CategoryThumbnailImage from './CategoryThumbnailImage'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { errorCategoryMessage } from '@/messages/auth/categoryMessages.'

// Types
interface UpdateCategoryModalProps {
  children: ReactNode
  category: Category
}

const UpdateCategoryModal = ({ children, category }: UpdateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty }
  } = useForm<CategoryForm>({
    defaultValues: {
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || null,
      parentId: category.parentId || null,
      thumbnailImageId: category.thumbnailImageId || null
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
        const { status, data } = await updateCategory(String(category.id), cleanedData)

        const errorMessage = handleApiError(status, errorCategoryMessage)

        if (errorMessage) {
          showToast({ type: 'error', message: errorMessage })

          return
        }

        if (status === 200 && data) {
          showToast({ type: 'success', message: 'دسته‌بندی با موفقیت به‌روزرسانی شد' })
          queryClient.invalidateQueries({ queryKey: ['categories'] })
          handleClose()
        }
      } catch (error: any) {
        showToast({
          type: 'error',
          message: error?.data?.message || 'خطایی در به‌روزرسانی دسته‌بندی رخ داد'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [queryClient, handleClose, category.id]
  )

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش دسته‌بندی'>
        {children}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش دسته‌بندی'
        defaultMaxWidth='lg'
        actions={
          <>
            <Button onClick={handleClose} color='secondary' disabled={isLoading}>
              انصراف
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant='contained'
              disabled={isLoading || !isDirty}
              startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}
            >
              {isLoading ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی'}
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
                <ParentCategorySelect control={control} errors={errors} isLoading={isLoading} />

                <CategoryThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
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
        </form>
      </CustomDialog>
    </div>
  )
}

export default UpdateCategoryModal
