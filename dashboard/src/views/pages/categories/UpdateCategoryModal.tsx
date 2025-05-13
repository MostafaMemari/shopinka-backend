'use client'

// React Imports
import { useState, useCallback, ReactNode } from 'react'

// MUI Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import Grid from '@mui/material/Grid2'

// Form Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// API and Utility Imports
import { showToast } from '@/utils/showToast'
import { categorySchema } from '@/libs/validators/category.schemas'
import { updateCategory } from '@/libs/api/category'
import { CategoryForm, Category } from '@/types/app/category'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import ParentCategorySelect from './ParentCategorySelect'
import CategoryThumbnailImage from './CategoryThumbnailImage'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { errorCategoryMessage } from '@/messages/auth/categoryMessages.'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import getChangedFields from '@/utils/getChangedFields'
import FormActions from '@/components/FormActions'
import { Button } from '@mui/material'

interface UpdateCategoryModalProps {
  children: ReactNode
  initialData: Category
}

const UpdateCategoryModal = ({ children, initialData }: UpdateCategoryModalProps) => {
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
      name: initialData.name ?? '',
      slug: initialData.slug ?? '',
      description: initialData.description ?? '',
      parentId: initialData.parentId,
      thumbnailImageId: initialData.thumbnailImageId
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
        if (initialData?.id !== undefined) {
          const cleanedData = cleanObject(formData)
          const changedData = getChangedFields(initialData, cleanedData)

          if (Object.keys(changedData).length === 0) {
            showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })

            return
          }

          const { status } = await updateCategory(String(initialData.id), changedData)

          const errorMessage = handleApiError(status, errorCategoryMessage)

          if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })

            return
          }

          if (status === 200) {
            showToast({ type: 'success', message: 'دسته‌بندی با موفقیت به‌روزرسانی شد' })
            invalidate(QueryKeys.Categories)
            handleClose()
          }
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطایی در به‌روزرسانی دسته‌بندی رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, initialData, invalidate]
  )

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-edit' />}>
            بروزرسانی دسته‌بندی
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش دسته‌بندی'
        defaultMaxWidth='lg'
        actions={
          <>
            <FormActions onCancel={handleClose} submitText='بروزرسانی' onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
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
                <CategoryThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} category={initialData} />
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
