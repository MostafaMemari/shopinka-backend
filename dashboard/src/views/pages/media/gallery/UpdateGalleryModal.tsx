'use client'

import { useState, useCallback, ReactNode } from 'react'
import { IconButton } from '@mui/material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import GalleryForm from './GalleryForm'
import FormActions from '@/components/FormActions'
import { Gallery } from '@/types/app/gallery.type'
import { useGalleryForm } from '@/hooks/reactQuery/useGallery'

interface UpdateGalleryModalProps {
  children?: ReactNode
  initialData: Gallery
}

const UpdateGalleryModal = ({ children, initialData }: UpdateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const { control, errors, isLoading, onSubmit, handleClose } = useGalleryForm({
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
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش گالری'>
        {children || (
          <IconButton size='small'>
            <i className='tabler-edit text-gray-500 text-lg' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='بروزرسانی گالری'
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleModalClose} submitText='بروزرسانی' onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <GalleryForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default UpdateGalleryModal
