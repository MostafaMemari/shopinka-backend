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
import { useAttribute } from '@/hooks/reactQuery/useAttribute'
import { ProductVariantForm } from '@/types/app/productVariant.type'

interface CreateProductVariantModalProps {
  children?: ReactNode
  productId: string | number
  existingAttributeCombinations: string[]
}

const CreateProductVariantModal = ({ children, productId, existingAttributeCombinations }: CreateProductVariantModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { watch } = useFormContext()

  const attributeIds: number[] = watch('attributeIds') || []

  const { data: attributeData } = useAttribute({
    enabled: true,
    params: {
      take: 20,
      includeThumbnailImage: true,
      includeChildren: true,
      childrenDepth: 6
    },
    staleTime: 5 * 60 * 1000
  })

  const attributes: Attribute[] = (attributeData?.data?.items || []).filter((attr: Attribute) => attributeIds.includes(attr.id))

  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>(() =>
    attributes.map(attr => ({
      attributeId: attr.id,
      valueId: null,
      value: ''
    }))
  )

  const { isLoading, onSubmit, handleClose, setValue } = useProductVariantForm({
    productId: Number(productId)
  })

  useEffect(() => {
    const fields: (keyof ProductVariantForm)[] = ['quantity', 'basePrice', 'salePrice', 'width', 'height', 'length', 'weight']

    fields.forEach(field => setValue(field, watch(field) || null))
  }, [watch, setValue])

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
