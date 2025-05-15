'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import CategoryForm from './CategoryForm'
import FormActions from '@/components/FormActions'
import { Category } from '@/types/app/category.type'
import { useCategoryForm } from '@/hooks/reactQuery/useCategory'

interface UpdateCategoryModalProps {
  children: ReactNode
  initialData: Category
}

const UpdateCategoryModal = ({ children, initialData }: UpdateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const { control, errors, setValue, isLoading, onSubmit, handleClose } = useCategoryForm({
    initialData,
    isUpdate: true
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleModalClose = useCallback(() => {
    setOpen(false)
    handleClose()
  }, [handleClose])

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
        onClose={handleModalClose}
        title='ویرایش دسته‌بندی'
        defaultMaxWidth='lg'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleModalClose} isLoading={isLoading} submitText={initialData ? 'بروزرسانی' : 'ثبت'} />}
      >
        <CategoryForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} initialData={initialData} />
      </CustomDialog>
    </div>
  )
}

export default UpdateCategoryModal
