'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import PageForm from './PageForm'
import FormActions from '@/components/FormActions'
import { usePageForm } from '@/hooks/reactQuery/usePage'

interface CreatePageModalProps {
  children?: ReactNode
}

const CreatePageModal = ({ children }: CreatePageModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, isLoading, onSubmit } = usePageForm({ handleModalClose: handleClose })

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت برگه جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت برگه جدید'
        defaultMaxWidth='md'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <PageForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreatePageModal
