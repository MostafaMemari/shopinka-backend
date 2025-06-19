'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import FormActions from '@/components/FormActions'
import ShippingInfoForm from '../form/ShippingInfoForm'
import { useShippingInfoForm } from '@/hooks/reactQuery/useShippingInfo'
import { ShippingInfo } from '@/types/app/shippingInfo.type'

interface ShippingInfoModalProps {
  id: number
  shippingInfo?: ShippingInfo
  children?: ReactNode
}

const ShippingInfoModal = ({ children, id, shippingInfo }: ShippingInfoModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, isLoading, onSubmit } = useShippingInfoForm({
    handleModalClose: handleClose,
    orderId: id,
    initialData: shippingInfo,
    isUpdate: shippingInfo ? true : false
  })

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت ثبت حمل و نقل
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='حمل و نقل'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <ShippingInfoForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default ShippingInfoModal
