import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Props interface
interface ConfirmDeleteDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  children?: ReactNode
  confirmText?: string
  cancelText?: string
  defaultMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  dialogStyles?: object
}

// Confirm Delete Dialog component
const ConfirmDeleteDialog = ({
  open,
  onConfirm,
  onCancel,
  title = 'Confirm Deletion',
  children = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  defaultMaxWidth = 'sm',
  dialogStyles = {}
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open} maxWidth={defaultMaxWidth} fullWidth onClose={onCancel} aria-labelledby='confirm-delete-dialog-title' closeAfterTransition={false} sx={dialogStyles}>
      {title && <DialogTitle id='confirm-delete-dialog-title'>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onConfirm} color='error'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
