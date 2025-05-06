'use client'

import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

interface RemoveMediaModalProps {
  id: number
  name: string
}

const RemoveMediaModal = ({ id, name }: RemoveMediaModalProps) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async () => {
    console.log(`حذف فایل با ID: ${id}`)
    handleClose()
  }

  return (
    <>
      <IconButton color='error' onClick={handleOpen} title='حذف'>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
        <DialogTitle>حذف فایل</DialogTitle>
        <DialogContent>
          <DialogContentText> {`آیا مطمئن هستید که می‌خواهید فایل ${name} را حذف کنید؟`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            لغو
          </Button>
          <Button onClick={handleDelete} color='error' variant='contained'>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RemoveMediaModal
