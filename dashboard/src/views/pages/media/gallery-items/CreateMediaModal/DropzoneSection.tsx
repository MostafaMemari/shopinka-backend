import React from 'react'
import { Typography, Button, Avatar } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { styled } from '@mui/material/styles'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { showToast } from '@/utils/showToast'

const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    }
  }
}))

interface DropzoneSectionProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  maxFiles: number
}

const DropzoneSection: React.FC<DropzoneSectionProps> = ({ files, setFiles, maxFiles }) => {
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

      setFiles([...files, ...acceptedFiles])
    }
  })

  return (
    <Dropzone>
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ccc', padding: 20, textAlign: 'center' }}>
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
    </Dropzone>
  )
}

export default DropzoneSection
