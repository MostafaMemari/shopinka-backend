'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import TagForm from './TagForm'
import FormActions from '@/components/FormActions'
import { useTagForm } from '@/hooks/reactQuery/useTag'

interface CreateTagModalProps {
  children?: ReactNode
}

const CreateTagModal = ({ children }: CreateTagModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, setValue, isLoading, onSubmit } = useTagForm({ handleModalClose: handleClose })

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت برچسب جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت برچسب جدید'
        defaultMaxWidth='md'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <TagForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateTagModal
