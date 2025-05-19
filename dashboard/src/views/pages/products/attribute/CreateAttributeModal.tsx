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
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, isLoading, onSubmit } = useAttributeForm({ handleModalClose: handleClose })

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
        onClose={handleClose}
        title='ثبت ویژگی جدید'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateAttributeModal
