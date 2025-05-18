'use client'

import { useState, useCallback, useEffect, ReactNode, useMemo } from 'react'
import Button from '@mui/material/Button'
import FormActions from '@/components/FormActions'
import AttributeSelector, { SelectedValue } from './AttributeSelector'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useProductVariantForm } from '@/hooks/reactQuery/useProductVariant'
import { Attribute } from '@/types/app/productAttributes.type'
import { useFormContext } from 'react-hook-form'
import { showToast } from '@/utils/showToast'

interface CreateProductVariantModalProps {
  children?: ReactNode
  productId: string | number
  attributes: Attribute[]
  existingAttributeCombinations: string[]
}

const CreateProductVariantModal = ({ children, productId, attributes, existingAttributeCombinations }: CreateProductVariantModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const { watch } = useFormContext()

  const quantity: number = useMemo(() => watch('quantity') || null, [watch])
  const basePrice: number = useMemo(() => watch('basePrice') || null, [watch])
  const salePrice: number = useMemo(() => watch('salePrice') || null, [watch])
  const width: number = useMemo(() => watch('width') || null, [watch])
  const height: number = useMemo(() => watch('height') || null, [watch])
  const length: number = useMemo(() => watch('length') || null, [watch])
  const weight: number = useMemo(() => watch('weight') || null, [watch])

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
    setValue('quantity', quantity)
    setValue('basePrice', basePrice)
    setValue('salePrice', salePrice)
    setValue('width', width)
    setValue('height', height)
    setValue('length', length)
    setValue('weight', weight)
  }, [quantity, basePrice, salePrice, width, height, length, weight, setValue])

  useEffect(() => {
    const newAttributeValueIds = selectedValues.map(item => item.valueId).filter((id): id is number => id !== null)

    setValue('attributeValueIds', newAttributeValueIds, { shouldValidate: true })
  }, [selectedValues, setValue])

  const isDuplicate = useMemo(() => {
    const currentCombination = selectedValues
      .map(item => item.valueId)
      .filter((id): id is number => id !== null)
      .sort()
      .join(',')

    return existingAttributeCombinations.includes(currentCombination)
  }, [selectedValues, existingAttributeCombinations])

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

  const handleSubmit = useCallback(() => {
    if (isDuplicate) {
      showToast({ type: 'error', message: 'این ترکیب ویژگی‌ها قبلاً وجود دارد!' })

      return
    }

    onSubmit()
  }, [isDuplicate, onSubmit])

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
        actions={<FormActions submitText='ثبت' onCancel={handleModalClose} onSubmit={handleSubmit} isLoading={isLoading} disabled={isDuplicate} />}
      >
        <AttributeSelector attributes={attributes} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
      </CustomDialog>
    </div>
  )
}

export default CreateProductVariantModal
