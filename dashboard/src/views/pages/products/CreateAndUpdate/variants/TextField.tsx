'use client'

import TextField from '@mui/material/TextField'
import { type TextFieldProps } from '@mui/material/TextField'

const CustomTextField = ({ value, ...props }: TextFieldProps) => {
  return <TextField {...props} value={value ?? ''} />
}

export default CustomTextField
