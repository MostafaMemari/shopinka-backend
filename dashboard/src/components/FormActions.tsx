import { Button, CircularProgress } from '@mui/material'

interface FormActionsProps {
  onCancel: () => void
  onSubmit: () => void
  isLoading?: boolean
  cancelText?: string
  submitText?: string
}

const FormActions = ({ onCancel, onSubmit, isLoading = false, cancelText = 'انصراف', submitText = 'ثبت' }: FormActionsProps) => {
  return (
    <>
      <Button onClick={onCancel} color='secondary'>
        {cancelText}
      </Button>
      <Button onClick={onSubmit} variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}>
        {isLoading ? 'در حال ثبت...' : submitText}
      </Button>
    </>
  )
}

export default FormActions
