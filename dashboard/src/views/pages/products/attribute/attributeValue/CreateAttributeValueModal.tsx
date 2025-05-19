'use client'

import { useState, useCallback, ReactNode } from 'react'
import { IconButton } from '@mui/material'
import CustomDialog from '@core/components/mui/CustomDialog'
import AttributeValueForm from './AttributeValueForm'
import FormActions from '@/components/FormActions'
import { AttributeType } from '@/types/app/productAttributes.type'
import { useAttributeValueForm } from '@/hooks/reactQuery/useAttributeValues'

interface CreateAttributeValueModalProps {
  children?: ReactNode
  attributeName: string
  attributeId: number
  attributeType: AttributeType
}

const CreateAttributeValueModal = ({ attributeName, attributeId, attributeType, children }: CreateAttributeValueModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, isLoading, onSubmit } = useAttributeValueForm({
    attributeType,
    attributeId,
    handleModalClose: handleClose
  })

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <IconButton sx={{ direction: 'rtl', margin: '4px', cursor: 'pointer', padding: 0 }}>
            <i className='tabler-plus' style={{ fontSize: '24px' }} />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`ثبت متغیر ویژگی برای ${attributeName}`}
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeValueForm control={control} errors={errors} isLoading={isLoading} attributeType={attributeType} />
      </CustomDialog>
    </div>
  )
}

export default CreateAttributeValueModal
