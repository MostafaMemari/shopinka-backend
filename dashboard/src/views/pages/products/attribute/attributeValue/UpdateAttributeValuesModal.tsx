'use client'

import { useState, useCallback, ReactNode } from 'react'
import { Typography } from '@mui/material'
import CustomDialog from '@core/components/mui/CustomDialog'
import AttributeValueForm from './AttributeValueForm'
import FormActions from '@/components/FormActions'
import { AttributeType, AttributeValueForm as AttributeValueFormType } from '@/types/app/productAttributes.type'
import { useAttributeValueForm } from '@/hooks/reactQuery/useAttributeValues'

interface UpdateAttributeValueModalProps {
  children?: ReactNode
  attributeType: AttributeType
  initialData: Partial<AttributeValueFormType & { id: string }>
}

const UpdateAttributeValueModal = ({ attributeType, initialData, children }: UpdateAttributeValueModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, isLoading, onSubmit } = useAttributeValueForm({
    initialData,
    attributeType,
    isUpdate: true,
    handleModalClose: handleClose
  })

  return (
    <div>
      <div onClick={handleOpen}>{children || <Typography className='cursor-pointer'>{initialData.name}</Typography>}</div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`بروزرسانی ${initialData.name}`}
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleClose} submitText='بروزرسانی' onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeValueForm control={control} errors={errors} isLoading={isLoading} attributeType={attributeType} />
      </CustomDialog>
    </div>
  )
}

export default UpdateAttributeValueModal
