import React from 'react'
import { List, ListItem, IconButton, Typography } from '@mui/material'
import { formatFileSize } from '@/utils/formatters'

interface FileListProps {
  files: File[]
  onRemoveFile: (file: File) => void
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    }

    return <i className='tabler-file-description' />
  }

  return (
    <List>
      {files.map(file => (
        <ListItem
          key={file.name}
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
          <IconButton onClick={() => onRemoveFile(file)}>
            <i className='tabler-x text-xl' />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FileList
