'use client'

import React, { useState } from 'react'
import { Button, DialogContent, List, ListItem, IconButton, Typography, Avatar, CircularProgress } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useParams, useRouter } from 'next/navigation'
import { showToast } from '@/utils/showToast'
import { createGalleryItem } from '@/libs/api/client/galleyItem'
import { formatFileSize } from '@/utils/formatters'

type FileProp = {
  name: string
  type: string
  size: number
}

const CreateMediaModal = () => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxFiles = 5
  const router = useRouter()

  const { id: galleryId } = useParams<{ id: string }>()

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setFiles([])
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: File[], fileRejections) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        showToast({ type: 'error', message: `حداکثر ${maxFiles} فایل می‌توانید انتخاب کنید!` })

        return
      }

      if (fileRejections.length > 0) {
        showToast({ type: 'error', message: 'فقط فایل‌های تصویری مجاز هستند!' })

        return
      }

      setFiles([...files, ...acceptedFiles.map((file: File) => Object.assign(file))])
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    }

    return <i className='tabler-file-description' />
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleSubmit = async () => {
    if (!files.length) {
      showToast({ type: 'error', message: 'هیچ فایلی انتخاب نشده است!' })

      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      files.forEach(file => {
        formData.append('image', file)
      })
      formData.append('galleryId', galleryId)

      const res = await createGalleryItem(formData)

      if (res?.status === 200 || res?.status === 201) {
        showToast({ type: 'success', message: 'آپلود فایل با موفقیت انجام شد' })

        router.refresh()
        handleClose()
      } else {
        showToast({ type: 'error', message: 'خطایی در آپلود رخ داد!' })
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      showToast({ type: 'error', message: 'خطایی در ارتباط با سرور رخ داد!' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem
      key={file.name}
      className='file-list-item'
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '8px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <IconButton onClick={() => handleRemoveFile(file)} sx={{ marginRight: '8px' }}>
        <i className='tabler-x' style={{ fontSize: '20px', color: '#ff4d4f' }} />
      </IconButton>
      <div className='file-details' style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div className='file-preview' style={{ marginLeft: '10px' }}>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography className='file-name' variant='body1' sx={{ fontWeight: 500 }}>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2' sx={{ color: 'text.secondary' }}>
            {formatFileSize(file.size)}
          </Typography>
        </div>
      </div>
    </ListItem>
  ))

  return (
    <>
      <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />}>
        آپلود فایل جدید
      </Button>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='آپلود فایل جدید'
        defaultMaxWidth='md'
        actions={
          <>
            <Button onClick={handleClose} color='secondary'>
              انصراف
            </Button>
            <Button
              onClick={handleSubmit}
              variant='contained'
              disabled={!files.length || isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null}
            >
              {isSubmitting ? 'در حال آپلود...' : 'آپلود'}
            </Button>
          </>
        }
      >
        <DialogContent>
          <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ccc', padding: 20, textAlign: 'center', marginBottom: 16 }}>
            <input {...getInputProps()} />
            <div className='flex items-center flex-col'>
              <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                <i className='tabler-upload' />
              </Avatar>
              <Typography variant='h6' className='mbe-2.5'>
                تصاویر را اینجا رها کنید یا کلیک کنید برای آپلود
              </Typography>
              <Typography>
                حداکثر {maxFiles} تصویر می‌توانید آپلود کنید.{' '}
                <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                  مرور
                </a>
              </Typography>
            </div>
          </div>
          {files.length > 0 && (
            <>
              <List>{fileList}</List>
              <Button color='error' variant='outlined' onClick={() => setFiles([])} style={{ marginTop: 8 }}>
                حذف همه
              </Button>
            </>
          )}
        </DialogContent>
      </CustomDialog>
    </>
  )
}

export default CreateMediaModal
