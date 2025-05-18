'use client'

import { useState, useCallback, useEffect, ReactNode, useMemo } from 'react'
import Button from '@mui/material/Button'
import FormActions from '@/components/FormActions'
import AttributeSelector, { SelectedValue } from './AttributeSelector'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useProductVariantForm } from '@/hooks/reactQuery/useProductVariant'
import { Attribute } from '@/types/app/productAttributes.type'

interface CreateProductVariantModalProps {
  children?: ReactNode
  productId: string | number
  attributes: Attribute[]
}

const CreateProductVariantModal = ({ children, productId, attributes }: CreateProductVariantModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>(() =>
    attributes.map(attr => ({
      attributeId: attr.id,
      valueId: null,
      value: ''
    }))
  )

  const { control, errors, setValue, isLoading, onSubmit, handleClose } = useProductVariantForm({
    productId: Number(productId)
  })

  useEffect(() => {
    const newAttributeValueIds = selectedValues.map(item => item.valueId).filter((id): id is number => id !== null)

    setValue('attributeValueIds', newAttributeValueIds, { shouldValidate: true })
  }, [selectedValues, setValue])

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleModalClose = useCallback(() => {
    setOpen(false)
    setSelectedValues(
      attributes.map(attr => ({
        attributeId: attr.id,
        valueId: null,
        value: ''
      }))
    )
    handleClose()
  }, [handleClose, attributes])

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            افزودن متغیر جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleModalClose}
        title='افزودن متغیر جدید'
        defaultMaxWidth='lg'
        actions={<FormActions submitText='ثبت' onCancel={handleModalClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <AttributeSelector attributes={attributes} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
      </CustomDialog>
    </div>
  )
}

export default CreateProductVariantModal
