'use client'

import { useState, useCallback, ReactNode } from 'react'
import { IconButton } from '@mui/material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import ShippingForm from './ShippingForm'
import FormActions from '@/components/FormActions'
import { useShippingForm } from '@/hooks/reactQuery/useShipping'
import { Shipping } from '@/types/app/shipping.type'

interface UpdateShippingModalProps {
  children?: ReactNode
  initialData: Shipping
}

const UpdateShippingModal = ({ children, initialData }: UpdateShippingModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const { control, errors, isLoading, onSubmit, handleClose } = useShippingForm({
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
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش حمل و نقل'>
        {children || (
          <IconButton size='small'>
            <i className='tabler-edit text-gray-500 text-lg' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='بروزرسانی حمل و نقل'
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleModalClose} submitText='بروزرسانی' onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <ShippingForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default UpdateShippingModal
