'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import CategoryForm from './CategoryForm'
import FormActions from '@/components/FormActions'
import { useCategoryForm } from '@/hooks/reactQuery/useCategory'

interface CreateCategoryModalProps {
  children?: ReactNode
}

const CreateCategoryModal = ({ children }: CreateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { control, errors, setValue, isLoading, onSubmit, handleClose } = useCategoryForm({})

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleModalClose = useCallback(() => {
    setOpen(false)
    handleClose()
  }, [handleClose])

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت دسته‌بندی جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='ثبت دسته‌بندی جدید'
        defaultMaxWidth='md'
        actions={<FormActions submitText='ثبت' onCancel={handleModalClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <CategoryForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateCategoryModal
