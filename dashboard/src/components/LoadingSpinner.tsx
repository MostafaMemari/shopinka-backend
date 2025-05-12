'use client'

import { Box, Card, CircularProgress, useTheme } from '@mui/material'

interface LoadingSpinnerProps {
  size?: number | string
  thickness?: number
  color?: string
  height?: number | string
  bgcolor?: string
  sx?: object
  circleSx?: object
}

const LoadingSpinner = ({ size = 60, thickness = 4, color = 'primary.main', height = '100vh', bgcolor = 'background.paper', sx = {}, circleSx = {} }: LoadingSpinnerProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
        bgcolor: bgcolor || theme.palette.background.paper,
        ...sx
      }}
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{
          color: color || theme.palette.primary.main,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
            ...circleSx
          }
        }}
      />
    </Card>
  )
}

export default LoadingSpinner
