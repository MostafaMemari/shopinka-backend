'use client'

import { useState, useCallback, ReactNode } from 'react'
import { IconButton } from '@mui/material'
import CustomDialog from '@core/components/mui/CustomDialog'
import AttributeForm from './AttributeForm'
import FormActions from '@/components/FormActions'
import { Attribute } from '@/types/app/productAttributes'
import { useAttributeForm } from '@/hooks/reactQuery/useAttribute'

interface UpdateAttributeModalProps {
  children?: ReactNode
  initialData: Attribute
}

const UpdateAttributeModal = ({ children, initialData }: UpdateAttributeModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const { control, errors, isLoading, onSubmit, handleClose } = useAttributeForm({
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
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش ویژگی'>
        {children || (
          <IconButton size='small'>
            <i className='tabler-edit text-gray-500 text-lg' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='بروزرسانی ویژگی'
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleModalClose} submitText='بروزرسانی' onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default UpdateAttributeModal
