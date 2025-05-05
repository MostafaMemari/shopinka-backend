import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import type { Breakpoint } from '@mui/material/styles'

// Props interface
interface CustomDialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  defaultMaxWidth?: Breakpoint
  actions?: ReactNode
  dialogStyles?: object
}

// Custom Dialog component
const CustomDialog = (props: CustomDialogProps) => {
  const { open, onClose, title = 'Dialog', children, defaultMaxWidth = 'sm', actions, dialogStyles = {} } = props

  return (
    <Dialog open={open} maxWidth={defaultMaxWidth} fullWidth onClose={onClose} aria-labelledby='custom-dialog-title' closeAfterTransition={false} sx={dialogStyles}>
      {title && <DialogTitle id='custom-dialog-title'>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions className='dialog-actions-dense'>{actions || <Button onClick={onClose}>Close</Button>}</DialogActions>
    </Dialog>
  )
}

export default CustomDialog
