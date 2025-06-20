'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import PageForm from './PageForm'
import FormActions from '@/components/FormActions'
import { Page } from '@/types/app/page.type'
import { usePageForm } from '@/hooks/reactQuery/usePage'

interface UpdatePageModalProps {
  children: ReactNode
  initialData: Page
}

const UpdatePageModal = ({ children, initialData }: UpdatePageModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, setValue, isLoading, onSubmit } = usePageForm({
    initialData,
    isUpdate: true,
    handleModalClose: handleClose
  })

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-edit' />}>
            بروزرسانی برگه
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش برگه'
        defaultMaxWidth='lg'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleClose} isLoading={isLoading} submitText={initialData ? 'بروزرسانی' : 'ثبت'} />}
      >
        <PageForm control={control} errors={errors} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default UpdatePageModal
