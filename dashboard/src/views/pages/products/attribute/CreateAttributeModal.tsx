'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import AttributeForm from './AttributeForm'
import FormActions from '@/components/FormActions'
import { useAttributeForm } from '@/hooks/reactQuery/useAttribute'

interface CreateAttributeModalProps {
  children?: ReactNode
}

const CreateAttributeModal = ({ children }: CreateAttributeModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { control, errors, isLoading, onSubmit, handleClose } = useAttributeForm({})

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
            ثبت ویژگی جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='ثبت ویژگی جدید'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleModalClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateAttributeModal
