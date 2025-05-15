'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import GalleryForm from './GalleryForm'
import FormActions from '@/components/FormActions'
import { useGalleryForm } from '@/hooks/reactQuery/useGallery'

interface CreateGalleryModalProps {
  children?: ReactNode
}

const CreateGalleryModal = ({ children }: CreateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])

  const { control, errors, isLoading, onSubmit, handleClose } = useGalleryForm({
    onSuccess: () => setOpen(false)
  })

  const handleModalClose = useCallback(() => {
    setOpen(false)
    handleClose()
  }, [handleClose])

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت گالری جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='ثبت گالری جدید'
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleModalClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <GalleryForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateGalleryModal
