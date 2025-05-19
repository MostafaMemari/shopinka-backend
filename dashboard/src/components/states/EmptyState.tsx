'use client'

import { Box, Typography, useTheme } from '@mui/material'
import { Inbox } from '@mui/icons-material'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  minHeight?: number | string
  maxWidth?: number | string
  sx?: object
  enableAnimation?: boolean
}

const EmptyState = ({
  title = 'هیچ داده‌ای یافت نشد',
  subtitle = 'به نظر می‌رسد هیچ داده‌ای در این بخش وجود ندارد. می‌توانید داده‌های جدید اضافه کنید!',
  icon = <Inbox color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.6 }} />,
  children,
  minHeight = '300px',
  maxWidth = '100%',
  sx = {},
  enableAnimation = true
}: EmptyStateProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth,
        minHeight,
        border: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        p: 4,
        bgcolor: theme.palette.background.paper,
        boxShadow: 'none',
        ...(enableAnimation && {
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: {
              opacity: 0,
              transform: 'translateY(10px)'
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }),
        ...sx
      }}
    >
      {icon}
      <Typography variant='h6' color='text.secondary' sx={{ fontWeight: 500, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ maxWidth: '400px', mb: 3 }}>
        {subtitle}
      </Typography>
      {children}
    </Box>
  )
}

export default EmptyState
