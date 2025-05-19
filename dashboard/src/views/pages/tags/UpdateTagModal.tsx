'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import TagForm from './TagForm'
import FormActions from '@/components/FormActions'
import { Tag } from '@/types/app/tag.type'
import { useTagForm } from '@/hooks/reactQuery/useTag'

interface UpdateTagModalProps {
  children: ReactNode
  initialData: Tag
}

const UpdateTagModal = ({ children, initialData }: UpdateTagModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, setValue, isLoading, onSubmit } = useTagForm({
    initialData,
    isUpdate: true,
    handleModalClose: handleClose
  })

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-edit' />}>
            بروزرسانی برچسب
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش برچسب'
        defaultMaxWidth='lg'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleClose} isLoading={isLoading} submitText={initialData ? 'بروزرسانی' : 'ثبت'} />}
      >
        <TagForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} initialData={initialData} />
      </CustomDialog>
    </div>
  )
}

export default UpdateTagModal
