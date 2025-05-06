'use client'

import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, IconButton, Typography, Avatar } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import CustomDialog from '@/@core/components/mui/CustomDialog'

type FileProp = {
  name: string
  type: string
  size: number
}

const CreateMediaModal = () => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setFiles([])
  }

  // تنظیمات react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles.map((file: File) => Object.assign(file))])
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleSubmit = async () => {
    if (!files.length) return

    const formData = new FormData()

    files.forEach(file => {
      formData.append('files', file) // اضافه کردن فایل‌ها به FormData
    })

    // لاگ FormData برای بررسی (می‌تونی اینو به API بفرستی)

    console.log('FormData برای آپلود:', formData)

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    // اینجا می‌تونی درخواست API رو بنویسی
    // مثلاً:
    // await fetch('/api/upload', { method: 'POST', body: formData })

    handleClose()
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
        <div className='file-preview' style={{ marginRight: '12px' }}>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography className='file-name' variant='body1' sx={{ fontWeight: 500 }}>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2' sx={{ color: 'text.secondary' }}>
            {Math.round(file.size / 100) / 10 > 1000 ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} MB` : `${(Math.round(file.size / 100) / 10).toFixed(1)} KB`}
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
            <Button onClick={handleSubmit} variant='contained' disabled={!files.length}>
              آپلود
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
                فایل‌ها را اینجا رها کنید یا کلیک کنید برای آپلود
              </Typography>
              <Typography>
                فایل‌ها را اینجا رها کنید یا{' '}
                <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                  مرور
                </a>{' '}
                کنید
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
