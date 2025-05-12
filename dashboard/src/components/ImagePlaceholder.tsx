'use client'

import { Box, Typography, useTheme } from '@mui/material'

interface ImagePlaceholderProps {
  width?: number | string
  height?: number | string
  text?: string
  borderColor?: string
  bgcolor?: string
  sx?: object
}

const ImagePlaceholder = ({ width = 120, height = 120, text = 'تصویری انتخاب نشده', borderColor, bgcolor, sx = {} }: ImagePlaceholderProps) => {
  const theme = useTheme()

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
        bgcolor: bgcolor || theme.palette.background.paper,
        ...sx
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        {text}
      </Typography>
    </Box>
  )
}

export default ImagePlaceholder
