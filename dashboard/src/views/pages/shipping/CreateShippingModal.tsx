'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import ShippingForm from './ShippingForm'
import FormActions from '@/components/FormActions'
import { useShippingForm } from '@/hooks/reactQuery/useShipping'

interface CreateShippingModalProps {
  children?: ReactNode
}

const CreateShippingModal = ({ children }: CreateShippingModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])

  const { control, errors, isLoading, onSubmit, handleClose } = useShippingForm({})

  const handleModalClose = useCallback(() => {
    setOpen(false)
    handleClose()
  }, [handleClose])

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت حمل و نقل جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='ثبت حمل و نقل جدید'
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleModalClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <ShippingForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateShippingModal
