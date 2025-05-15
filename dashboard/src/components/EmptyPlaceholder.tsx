'use client'

import { Box, Typography, useTheme, alpha } from '@mui/material'

interface EmptyPlaceholderProps {
  width?: number | string
  height?: number | string
  text?: string
  borderColor?: string
  bgcolor?: string
  sx?: object
}

const EmptyPlaceholder = ({ width = 120, height = 120, text = 'محتوایی یافت نشد', borderColor, bgcolor, sx = {} }: EmptyPlaceholderProps) => {
  const theme = useTheme()

  const backgroundColor = bgcolor || alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.04 : 0.08)

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: 1,
        border: '1px dashed',
        borderColor: borderColor || theme.palette.divider,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: backgroundColor,
        textAlign: 'center',
        px: 1,
        ...sx
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        {text}
      </Typography>
    </Box>
  )
}

export default EmptyPlaceholder
