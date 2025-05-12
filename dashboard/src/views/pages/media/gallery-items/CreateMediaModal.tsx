'use client'

import React, { ReactNode, useState } from 'react'
import { Button, DialogContent, List, IconButton, Typography, Avatar, CircularProgress, ListItem, Box } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useParams, useRouter } from 'next/navigation'
import { showToast } from '@/utils/showToast'
import { formatFileSize } from '@/utils/formatters'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { createGalleryItem } from '@/libs/api/galleyItem'
import GallerySelect from '@/components/Gallery/GallerySelect'
import { type SelectChangeEvent } from '@mui/material'
import CreateGalleryModal from '@/views/pages/media/gallery/CreateGalleryModal'
import { useQueryClient } from '@tanstack/react-query'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

type FileProp = {
  name: string
  type: string
  size: number
}

const CreateMediaModal = ({ children }: { children?: ReactNode }) => {
  const [openUpload, setOpenUpload] = useState(false)
  const [openGallerySelect, setOpenGallerySelect] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>('')
  const maxFiles = 5
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id: galleryId } = useParams<{ id: string }>()

  const handleOpen = () => {
    if (galleryId) {
      setOpenUpload(true)
    } else {
      setOpenGallerySelect(true)
    }
  }

  const handleCloseUpload = () => {
    setOpenUpload(false)
    setFiles([])
    setSelectedGalleryId('')
  }

  const handleCloseGallerySelect = () => {
    setOpenGallerySelect(false)
    setSelectedGalleryId('')
  }

  const handleGalleryChange = (event: SelectChangeEvent<string>) => {
    const newGalleryId = event.target.value as string

    setSelectedGalleryId(newGalleryId)
    setOpenGallerySelect(false)
    setOpenUpload(true)
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
    } else {
      return <i className='tabler-file-description' />
    }
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

    const effectiveGalleryId = galleryId || selectedGalleryId

    if (!effectiveGalleryId) {
      showToast({ type: 'error', message: 'لطفاً یک گالری انتخاب کنید!' })

      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      files.forEach(file => {
        formData.append('image', file)
      })

      formData.append('galleryId', effectiveGalleryId)

      const res = await createGalleryItem(formData)

      if (res?.status === 200 || res?.status === 201) {
        showToast({ type: 'success', message: 'آپلود فایل با موفقیت انجام شد' })
        router.refresh()
        await queryClient.invalidateQueries({ queryKey: ['gallery-items'] })
        handleCloseUpload()
      } else {
        showToast({ type: 'error', message: 'خطایی در آپلود رخ داد!' })
      }
    } catch (error) {
      showToast({ type: 'error', message: 'خطایی در ارتباط با سرور رخ داد!' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem
      key={file.name}
      className='pis-4 plb-3'
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
      <div className='file-details' style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div className='file-preview' style={{ marginLeft: '10px' }}>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography className='file-name font-medium' color='text.primary'>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2'>
            {formatFileSize(file.size)}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      {children || (
        <Button variant='contained' className='max-sm:w-full' onClick={handleOpen} startIcon={<i className='tabler-plus' />} sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
          آپلود فایل جدید
        </Button>
      )}
      <CustomDialog
        open={openGallerySelect}
        onClose={handleCloseGallerySelect}
        title='انتخاب گالری'
        defaultMaxWidth='sm'
        actions={
          <Button onClick={handleCloseGallerySelect} color='secondary'>
            انصراف
          </Button>
        }
      >
        <Box display='flex' gap={2}>
          <CreateGalleryModal />
          <GallerySelect value={selectedGalleryId} onChange={handleGalleryChange} enabled={openGallerySelect} />
        </Box>
      </CustomDialog>

      <Dropzone>
        <CustomDialog
          open={openUpload}
          onClose={handleCloseUpload}
          title='آپلود فایل جدید'
          defaultMaxWidth='md'
          actions={
            <>
              <Button onClick={handleCloseUpload} color='secondary'>
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
                <Typography variant='h6'>تصویر خود را اینجا بکشید و رها کنید.</Typography>
                <Typography color='text.disabled'>یا</Typography>
                <Button className='mt-2' onClick={e => e.preventDefault()} variant='tonal' size='small'>
                  مرور تصویر
                </Button>
                <Typography className='mt-4' color='text.disabled'>
                  حداکثر {maxFiles} تصویر می‌توانید آپلود کنید
                </Typography>
              </div>
            </div>
            {files.length > 0 && (
              <>
                <List>{fileList}</List>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles} style={{ marginTop: 8 }}>
                  حذف همه
                </Button>
              </>
            )}
          </DialogContent>
        </CustomDialog>
      </Dropzone>
    </>
  )
}

export default CreateMediaModal
